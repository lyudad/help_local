import React from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { ClientDashboardScreen, MyJobsScreen } from 'screens/client'
import { clientDashboard, myJobs } from 'constants/routes'
import { TabBarIcon } from 'components'
import { color, spacing } from 'theme'

export type ClientBottomNavParamList = {
  clientDashboard: undefined
  myJobs: undefined
}
type Focused = {
  focused: boolean
}
const TAB: ViewStyle = {
  flex: 1,
  borderRightWidth: 1,
  borderRightColor: color.palette.grey,
}

const Tab = createBottomTabNavigator<ClientBottomNavParamList>()

export function ClientBottomNav(): JSX.Element {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: color.secondary,
          paddingTop: spacing[2],
        },
      }}
    >
      <Tab.Screen
        name={clientDashboard}
        component={ClientDashboardScreen}
        options={{
          tabBarButton: (props) => (
            <View style={TAB}>
              <TouchableOpacity {...props} />
            </View>
          ),
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }: Focused) => (
            <TabBarIcon name='home' focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={myJobs}
        component={MyJobsScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }: Focused) => (
            <TabBarIcon name='tablet' focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
