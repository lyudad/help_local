import React from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { ApprovedScreen, HelperDashboardScreen } from 'screens/helper'
import { helperDashboard, approved } from 'constants/routes'
import { TabBarIcon } from 'components'
import { color, spacing } from 'theme'

export type HelperBottomNavParamList = {
  helperDashboard: undefined

  approved: undefined
}

type Focused = {
  focused: boolean
}
const TAB: ViewStyle = {
  flex: 1,
  borderRightWidth: 1,
  borderRightColor: color.palette.grey,
}

const Tab = createBottomTabNavigator<HelperBottomNavParamList>()

export function HelperBottomNav(): JSX.Element {
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
        name={helperDashboard}
        component={HelperDashboardScreen}
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
        name={approved}
        component={ApprovedScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }: Focused) => (
            <TabBarIcon name='bag' focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
