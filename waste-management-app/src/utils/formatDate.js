import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale('es')

export const formatDate  = (iso) => dayjs(iso).format('DD MMM YYYY, HH:mm')
export const fromNow     = (iso) => dayjs(iso).fromNow()
