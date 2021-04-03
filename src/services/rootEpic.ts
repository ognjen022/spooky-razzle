import { ConfigModule } from './config/module';
import { combineEpics } from 'redux-observable'
import { UserSecurityModule } from './userSecurity/module'
import { ContentModule } from './content/module'
import { PaymentsModule } from './payments/module'
import networkErroredEpic from './shared/epics/networkErroredEpic'
import gtmDataLayerPushEpic from './shared/epics/gtmDataLayerPushEpic'
import gtmPromoterPushEpic from './shared/epics/gtmPromoterPushEpic'
import intercomUpdateEpic from './shared/epics/intercomUpdateEpic'
import minuteTimerEpic from './shared/epics/minuteTimerEpic'
import windowScrollOnRouteChangeEpic from './shared/epics/windowScrollOnRouteChangeEpic'

import { ContactModule } from './contact/module'

const rootEpic = combineEpics(
  UserSecurityModule.epics,
  ContentModule.epics,
  PaymentsModule.epics,
  ContactModule.epics,
  ConfigModule.epics,
  ...networkErroredEpic,
  ...gtmDataLayerPushEpic,
  ...minuteTimerEpic,
  ...windowScrollOnRouteChangeEpic,
  ...intercomUpdateEpic,
  ...gtmPromoterPushEpic
)

export default rootEpic
