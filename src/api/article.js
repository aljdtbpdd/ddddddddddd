import request from '@/utils/request'

export const getArticle = ({
  channelId,
  timestamp,
  withTop = 1
}) => {
  return request.get('/app/v1_0/articles', {
    params: {
      channelId: channelId,
      timestamp: timestamp,
      withTop: withTop
    }
  })
}
