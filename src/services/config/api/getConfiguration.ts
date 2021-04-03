import { IConfigurationResponse } from './../models';
import { baseUrl } from '../../shared/baseUrl'
import { getHeaders } from '../../shared/getHeaders'
import { ApiResponse } from '../../shared/ApiResponse'

export const getConfiguration = (): Promise<ApiResponse<IConfigurationResponse>> => {
  return fetch(
    `${baseUrl}/v1/configuration/`, {
    method: 'GET',
    headers: getHeaders(),
  }
  ).then(async (response) => {
    let json = await response.json()
    const data: IConfigurationResponse = json
    return { success: response.status === 200, statusCode: response.status, data, is_success: response.status === 200 }
  })
}
