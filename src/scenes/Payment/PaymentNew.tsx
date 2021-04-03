import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useForm, useField } from "react-final-form-hooks";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import * as eventTypes from "../../services/payments/paymentDetails/eventTypes";

import styles from "./Payment.module.scss";

import PromoCode from "../../components/PromoCode/PromoCode";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/RootState";
import {
  purchaseTagRequestedEvent,
  purchaseWatchItAllRequestedEvent,
  showPurchaseModalToggledEvent,
  purchaseGamePassRequestedEvent,
  promoRequestedEvent,
} from "../../services/payments/purchase/events";
import {
  PromoInformation,
  PurchaseOption,
} from "../../services/payments/purchase/models";
import { push } from "connected-react-router";
import {
  selectGamePassPriceFormatted,
  selectWatchItAllPriceFormatted,
  selectSeasonPassPriceFormatted,
} from "../../services/payments/products/selectors";

import {
  isGamePass,
  isSeasonPass,
  selectPromoCode,
} from "../../services/payments/purchase/selectors";

import moment from "moment";
import Product, { productColor } from "../../components/Product/Product";
import { Link } from "react-router-dom";
import { selectTag } from "../../services/content/tags/selectors";
import { IStream, ITag, StreamTypes } from "../../services/content/tags/models";
import { debug } from "console";

interface IPaymentNewFormValues {
  promoCode: string | undefined;
  cardName: string | undefined;
  cardNumber: string | undefined;
  ccv: string | undefined;
  expiry: string | undefined;
}

interface IPaymentNewProps {
  readonly tagInfo: any | undefined;
  readonly eventId: number | undefined;
  readonly isLoggedIn: boolean;
}

const ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      fontFamily: "Modern Era, sans-serif",
      fontSize: "13px",
      backgroundColor: "transparent",
      color: "#F5F5F5",
      lineHeight: "auto",
    },
    invalid: {
      color: "#e82e06",
    },
  },
};

const validate = (values: IPaymentNewFormValues) => {
  const errors: IPaymentNewFormValues = {
    promoCode: undefined,
    cardName: undefined,
    cardNumber: undefined,
    ccv: undefined,
    expiry: undefined,
  };

  return errors;
};
const PaymentNew: React.FC<IPaymentNewProps> = (props) => {
  const elements = useElements();
  const stripe = useStripe();

  const [nameOnCard] = useState("");
  const [postal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setPaymentMethod] = useState(null);
  // Initial values form
  const initialValues: Partial<IPaymentNewFormValues> = {
    promoCode: undefined,
    cardName: undefined,
    cardNumber: undefined,
    ccv: undefined,
    expiry: undefined,
  };
  const onSubmit = async (payload: any) => {};
  const { form /*, handleSubmit, submitting */ } = useForm({
    onSubmit,
    validate,
    initialValues,
  });

  const watchItAllPriceFormatted = useSelector<RootState, string>((state) =>
    selectWatchItAllPriceFormatted(
      state.payments?.products,
      state.configuration
    )
  );
  const gamePassPriceFormatted = useSelector<RootState, string>((state) =>
    selectGamePassPriceFormatted(state.payments?.products, state.configuration)
  );
  const seasonPassPriceFormatted = useSelector<RootState, string>((state) =>
    selectSeasonPassPriceFormatted(state)
  );

  const gamePassSelected = useSelector<RootState, boolean>((state) =>
    isGamePass(state.payments.purchase)
  );
  const seasonPassSelected = useSelector<RootState, boolean>((state) =>
    isSeasonPass(state.payments.purchase)
  );
  const name = useSelector<RootState, string>(
    (state) => state.userSecurity?.profile?.name || ""
  );
  const isSaving = useSelector<RootState, boolean>(
    (state) => state.payments.purchase.isSaving
  );
  const promo = useSelector<RootState, PromoInformation | undefined>((state) =>
    selectPromoCode(state.payments.purchase)
  );
  const promoCode = useField("promoCode", form);
  const tag = useSelector<RootState, ITag | undefined>((state) =>
    selectTag(state, state.payments.purchase.tagId)
  );

  promoCode.input.onBlur = (e) => {
    const price = getPresetPrice().replace(/^[$*]/g, "");
    dispatch(promoRequestedEvent(promoCode.input.value, price));
  };
  const streams = useSelector<RootState, IStream[] | undefined>(
    (state) => state.content.tags.streams
  );
  const stream: IStream | undefined = _.find(
    streams || [],
    (stream: IStream) => stream.eventId === props.eventId
  );

  const [total, setTotal] = useState("");
  const [computeTrial, calculateTrial] = useState("");
  const [purchaseOption, setPurchaseOption] = useState<PurchaseOption>(
    PurchaseOption.WatchItAll
  );
  const [description, setDescription] = useState("\u00A0");
  const dispatch = useDispatch();

  const continueFree = () => {
    dispatch(showPurchaseModalToggledEvent(undefined, undefined, undefined));
    push("/browse");
  };

  const getPresetPrice = () => {
    if (gamePassSelected) return gamePassPriceFormatted;
    else if (seasonPassSelected) return seasonPassPriceFormatted;
    else return watchItAllPriceFormatted;
  };
  useEffect(() => {
    setTotal(getPresetPrice());
    if (gamePassSelected) {
      const videoStream = stream?.videoStreams.filter(
        (stream) => stream.streamType === StreamTypes.MatchStream
      )[0].streamName;
      setPurchaseOption(PurchaseOption.GamePass);
      setDescription(videoStream ?? "\u00A0");
    } else if (seasonPassSelected) {
      setPurchaseOption(PurchaseOption.SeasonPass);
      setDescription(tag?.name ?? "*Season Passes may vary in price");
    } else {
      setPurchaseOption(PurchaseOption.WatchItAll);
    }

    const daysAfter = moment(new Date()).add(30, "days");
    calculateTrial(`${daysAfter.format("DD.MM.YYYY")}`);
  }, []);

  useEffect(() => {
    const daysAfter = moment(new Date()).add(30, "days");
    calculateTrial(promo?.nextPayment ?? `${daysAfter.format("DD.MM.YYYY")}`);

    if (promo?.priceAfter) {
      setTotal(`$${(parseFloat(promo?.priceAfter ?? "0") / 100).toFixed(2)}`);
    } else {
      setTotal(getPresetPrice());
    }
  }, [promo]);
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      const token = await stripe.createToken(cardElement as any);
      dispatch({
        type: [eventTypes.PAYMENTS_PAYMENT_DETAILS_RECEIVED],
        payload: token,
      });
    } catch (error) {
      dispatch({
        type: [eventTypes.PAYMENTS_PAYMENT_DETAILS_ERRORED],
        payload: error,
      });
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement as any,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (payload.error) {
      console.log("Payment.tsx [error]", payload.error);
      setErrorMessage(payload.error.message as any);
      setPaymentMethod(null);
    } else {
      setPaymentMethod(payload.paymentMethod as any);

      switch (purchaseOption) {
        case PurchaseOption.WatchItAll:
          dispatch(
            purchaseWatchItAllRequestedEvent(promoCode.input.value, payload)
          );
          break;
        case PurchaseOption.SeasonPass:
          // console.log(payload);
          dispatch(purchaseTagRequestedEvent(payload));
          break;
        case PurchaseOption.GamePass:
          dispatch(purchaseGamePassRequestedEvent(payload));
          break;
      }
      setErrorMessage("");
    }
  };
  return (
    <div className={styles["payment-new"]} onClick={(e) => e.stopPropagation()}>
      <div className={styles["payment-new__content"]}>
        <div className={styles["payment-new__pricing-details"]}>
          <p className={styles["payment-new__header"]}>Plan details</p>
          {purchaseOption === PurchaseOption.GamePass && (
            <Product
              description={description}
              features={[
                "Watch a events live",
                "Watch unlimited on demand",
                "Watch on any device",
              ]}
              onModal={true}
              color={productColor.green}
              showPurchaseButton={false}
              title={"Game Pass"}
              price={`${gamePassPriceFormatted}`}
            />
          )}
          {purchaseOption === PurchaseOption.SeasonPass && (
            <Product
              description={description}
              features={[
                "Watch any event live from your selected season",
                "Watch unlimited on demand",
                "Watch on any device",
              ]}
              onModal={true}
              color={productColor.green}
              showPurchaseButton={false}
              title={"Season Pass"}
              price={`${seasonPassPriceFormatted}`}
            />
          )}
          {purchaseOption === PurchaseOption.WatchItAll && (
            <Product
              description={"Monthly Subscription"}
              features={[
                "Watch all events live",
                "Includes all competitions",
                "No fixed term contracts",
                "Watch unlimited on demand",
                "Watch on any device",
              ]}
              onModal={true}
              color={productColor.green}
              showPurchaseButton={false}
              title={"Watch It All"}
              price={`${watchItAllPriceFormatted} / Month`}
            />
          )}
        </div>
        <div className={styles["payment-new__payment-details"]}>
          <p className={styles["payment-new__header"]}>Payment details</p>
          <form
            onSubmit={handleSubmit2}
            className={styles["payment-new__form"]}
          >
            <p>
              <Input
                data={nameOnCard}
                placeholder="Name on card"
                label="cardName"
                type="text"
                required
              />
            </p>
            {
              <div className={styles["payment-new__form-group"]}>
                <p>
                  <CardNumberElement
                    id="cardNumber"
                    className={styles["payment-new__input"]}
                    /*onBlur={() => console.log('CardCvcElement blur')}
                                        onChange={() => console.log('CardCvcElement change')}
                                        onFocus={() => console.log('CardCvcElement focus')}
                                        onReady={() => console.log('CardCvcElement ready')}*/
                    options={{
                      ...ELEMENT_OPTIONS,
                      placeholder: "Credit card number ",
                    }}
                  />
                </p>
                <p>
                  <CardExpiryElement
                    id="expiry"
                    className={styles["payment-new__input"]}
                    /*onBlur={() => console.log('CardExpiryElement blur')}
                                        onChange={() => console.log('CardExpiryElement change')}
                                        onFocus={() => console.log('CardExpiryElement focus')}
                                        onReady={() => console.log('CardExpiryElement ready')}*/
                    options={{ ...ELEMENT_OPTIONS, placeholder: "Expiry date" }}
                  />
                </p>
                <p>
                  <CardCvcElement
                    id="cvc"
                    className={styles["payment-new__input"]}
                    /*onBlur={() => console.log('CardCvcElement blur')}
                                        onChange={() => console.log('CardCvcElement change')}
                                        onFocus={() => console.log('CardCvcElement focus')}
                                        onReady={() => console.log('CardCvcElement ready')}*/
                    options={{ ...ELEMENT_OPTIONS, placeholder: "CVV number" }}
                  />
                </p>
              </div>
            }
            {purchaseOption === PurchaseOption.WatchItAll && (
              <p>
                <PromoCode data={promoCode} />
                {/* <Input placeholder="Promo code"  data={promoCode}  label="promoCode" type="text" /> */}
              </p>
            )}
            {(purchaseOption === PurchaseOption.SeasonPass ||
              purchaseOption === PurchaseOption.GamePass) && (
              <p>
                <Input
                  placeholder="Promo code"
                  disabled={true}
                  label="promoCode"
                  type="text"
                />
              </p>
            )}
            <div className={styles["payment-new__total"]}>
              <div>Total</div>
              <div className="text-right">{total}</div>
              {purchaseOption === PurchaseOption.WatchItAll && (
                <>
                  <div>Next Payment Date</div>
                  <div className="text-right">{computeTrial}</div>
                </>
              )}
            </div>
            <p>
              <Button
                type="submit"
                variant="secondary"
                color="success"
                label="Purchase Plan"
                isLoading={isSaving}
              />
            </p>

            <div className={styles["payment-new__tos-links"]}>
              <p>
                By creating an account, you are agreeing to our{" "}
                <Link to="/terms-of-service">Terms</Link> and{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* {!isSaving && (
        <Button
          className={styles['payment-new__continue-free']}
          variant="secondary"
          color="ghost-green"
          onClick={continueFree}
          label="Continue for Free"
        ></Button>
      )} */}
    </div>
  );
};

export default PaymentNew;
