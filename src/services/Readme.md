## Notes:

*	Actions renamed to => Events
*	Top level modules align to the Microservices (UserSecurity, Payments etc)
*	Each module is sliced for the relevant sections. Eg UserSecurity contains Token, Profile slices
*	Each slice contains a reducer, events, and epics, and Api files
*	Each module has a module.ts file that exports the epic, reducer and events
*	root* only imports from module.ts files
*	To make a new slice copy an existing slice and integrate it into the module.ts
*	To create a new module copy another module and integrate it into root*.ts files
*	We shouldn't need to modify stores.ts again (hopefully)