/*eslint-disable no-unused-vars */
import React from 'react'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
import stubbedCourses from './stubs/COURSES'

const history = useBasename(createHistory)({
  basename: '/app'
})

const rootRoute = {
  component: 'div',
  childRoutes: [ 
    {
      path: '/',
      component: require('./components/App'),
      childRoutes: [
        {
          path: '/calendar',
          component: require('./routes/Calendar'),
          onEnter: { ensureSignedIn }
        },
        require('./routes/Course'),
        require('./routes/Grades'),
        require('./routes/Messages'),
        require('./routes/Profile')
      ]
    } 
  ]
}

React.render(
  <Router history={history} routes={rootRoute} />,
  document.getElementById('example')
)