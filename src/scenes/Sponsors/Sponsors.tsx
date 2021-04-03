import React from 'react'

// Logos Primary
import NibLogo from '../../svg/images/sponsors-logo/logo_nib.svg'
import AdidasLogo from '../../svg/images/sponsors-logo/logo_adidas.svg'
import AucklandCouncilLogo from '../../svg/images/sponsors-logo/logo_aucklandcouncil.svg'

// Logos Secondary
import Mitre10Logo from '../../svg/images/sponsors-logo/logo_mitre10.svg'
import NewWorldLogo from '../../svg/images/sponsors-logo/logo_nw.svg'
import ASBLogo from '../../svg/images/sponsors-logo/logo_asb.svg'
import TheWarehouseGroupLogo from '../../svg/images/sponsors-logo/logo_thewarehouse.svg'
import AllBlacksLogo from '../../svg/images/sponsors-logo/logo_allblacks.svg'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import SponsorsPrimary from '../../components/SponsorsPrimary/SponsorsPrimary'
import SponsorsSecondary from '../../components/SponsorsSecondary/SponsorsSecondary'

const primaryLogoItems = [
    {
        name: 'Nib',
        image: NibLogo
    },
    {
        name: 'Adidas',
        image: AdidasLogo
    },
    {
        name: 'Auckland Council',
        image: AucklandCouncilLogo
    }
]


const secondaryLogoItems = [
    {
        name: 'Mitre 10',
        image: Mitre10Logo
    },
    {
        name: 'New World',
        image: NewWorldLogo
    },
    {
        name: 'ASB',
        image: ASBLogo
    },
    {
        name: 'TWG',
        image: TheWarehouseGroupLogo
    },
    {
        name: 'All Blacks',
        image: AllBlacksLogo
    }
]

const Sponsors = () => {
    return (
        <LayoutDefault>
            <SponsorsPrimary items={primaryLogoItems} />
            <SponsorsSecondary items={secondaryLogoItems} />
        </LayoutDefault>

    )
}

export default Sponsors
