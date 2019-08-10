import request from '@/utils/request'

export const getChannels = () => {
  return request.get('/app/v1_0/user/channels'
  )
}
