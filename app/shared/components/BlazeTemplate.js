/* global Blaze */
import React from 'react'

class BlazeTemplate extends React.Component {
  static propTypes = {
    template: React.PropTypes.any.isRequired,
    component: React.PropTypes.any
  }
  static defaultProps = {
    component: 'div'
  }
  // we don't want to re-render this component if parent changes
  shouldComponentUpdate() {
    return false
  }
  componentDidMount() {
    let { template } = this.props
    this.view = Blaze.render( template, React.findDOMNode(this.refs.root) )
  }
  componentWillUnmount() {
    Blaze.remove(this.view)
  }
  render() {
    let { component, ...props } = this.props
    props.ref = 'root'
    return React.createElement(component, props)
  }
}

export default BlazeTemplate
