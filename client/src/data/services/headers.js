import axios from "axios"
import { StorageService } from "."
import { TOKEN_HEADER } from "../constants/storage.keys"

export const generateHeader = () => {
    let token = StorageService.getItemSession(TOKEN_HEADER)
    if (token) {
        return new axios.AxiosHeaders().set(TOKEN_HEADER, token)
    } else {
        throw new axios.AxiosError('Unauthorized', '403', {}, {}, { data: 'Unauthorized' })
    }
}