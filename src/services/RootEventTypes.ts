import { ConfigEventTypes } from './config/module';
import { ContactEventTypes } from './contact/module';
import { UserSecurityEventTypes } from './userSecurity/module'
import { ContentEventTypes } from './content/module'
import { PaymentsEventTypes } from './payments/module'

export type RootEventTypes = 
UserSecurityEventTypes 
| ContentEventTypes 
| PaymentsEventTypes 
| ContactEventTypes
| ConfigEventTypes
