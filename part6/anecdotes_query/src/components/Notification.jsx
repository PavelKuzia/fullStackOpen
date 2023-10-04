import { useContext } from 'react'
import NotificationContext from '../AppContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      { notification.length > 0 &&
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification
