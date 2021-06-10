import React, { createContext, useContext, useEffect, useState } from 'react'
import * as  Notifications from 'expo-notifications';
import Constants from 'expo-constants';

interface Context {
  time: number
}

const AplicationContext = createContext<Context>({} as Context)

export const AplicationProvider: React.FC = ({ children }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const loading = async () => {
      let experienceId = Constants.manifest.id ?? undefined;
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        experienceId,
      });
      console.log('--------------->>', experienceId, '->', expoPushToken);

     await Notifications.setNotificationCategoryAsync(
        'timout',
        [
          {
          identifier: 'next',
          buttonTitle: 'Iniciar Pausa',
        },
        {
          identifier: 'cancel',
          buttonTitle: 'Parar tarefas',
        },
        {
          identifier:'next_task',
          buttonTitle:'Iniciar outro',
          textInput:{
            placeholder:'Informe um motivo para iniciar',
            submitButtonTitle:'Enviar'
          }
        }
      ]
      )
      const cat = await Notifications.getNotificationCategoriesAsync()
      console.log(cat)
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
      const data = notification.request.content.data
      alert(JSON.stringify(data))
    });
    loading()

    return () => {
      Notifications.removeNotificationSubscription(subscription)
    }
  }, [])
  return (
    <AplicationContext.Provider
      value={{
        time
      }}>
      {children}
    </AplicationContext.Provider>
  )
}

function useAplicationContext() {
  const contex = useContext(AplicationContext)
  if (!contex) {
    throw new Error('Must have a context')
  }
  return contex
}

export { useAplicationContext, AplicationContext }