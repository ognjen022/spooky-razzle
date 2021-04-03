export interface IConfigurationState {
    readonly auth0_client_id: string | undefined
    readonly stripe_key: string | undefined
    readonly instrumentation_key: string | undefined
    readonly products: IProducts | undefined
}

export interface IProducts {
    readonly watch_it_all: string | undefined
    readonly game_pass: string| undefined
} 

export interface IConfigurationResponse {
    readonly auth0_client_id: string
    readonly watch_it_all_product_id: string
    readonly game_pass_product_id: string
    readonly stripe_key: string
    readonly instrumentation_key: string
}
