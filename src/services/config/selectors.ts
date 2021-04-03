import { IProducts, IConfigurationState } from './models';

export const selectProducts = (state: IConfigurationState): IProducts => {
    return state?.products ?? {game_pass: '', watch_it_all: ''}
};

export const selectStripeKey = (state: IConfigurationState): string => state.stripe_key ?? '';

export const selectAuth0ClientId = (state: IConfigurationState): string => state.auth0_client_id ?? '';