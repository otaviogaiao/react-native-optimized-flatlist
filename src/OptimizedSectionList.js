import React from 'react'
import { SectionList } from 'react-native'
import FlatListItem from './FlatListItem'

export default class OptimedSectionList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.rowRefs = {}
    this._renderItem = this._renderItem.bind(this)
    this._updateItem = this._updateItem.bind(this)
    this._viewableItemsChanged = this._viewableItemsChanged.bind(this)
    this._listRef = React.createRef()
  }

  _addRowRefs (ref, data) {
    if (!this.rowRefs[data.section.key]) {
      this.rowRefs[data.section.key] = []
    }
    this.rowRefs[data.section.key][data.index] = {
      ref: ref,
      item: data.item,
      index: data.index,
      sectionKey: data.section.key
    }
  }

  _updateItem (index, section, visibility) {
    if (!index) { // its a section object item
      return
    }

    if (!this.rowRefs[section.key][index].ref) {
      return false
    }
    this.rowRefs[section.key][index].ref.setVisibility(visibility)
    return visibility
  }

  _viewableItemsChanged ({ viewableItems, changed }) {
    changed.map(item => this._updateItem(item.index, item.section, item.isViewable)
    )
  }

  _renderItem (data) {
    const view = this.props.renderItem(data)
    return (
      <FlatListItem ref={myItem => this._addRowRefs(myItem, data)} viewComponent={view} data={data} />
    )
  }

  render () {
    return (
      <SectionList
        {...this.props}
        renderItem={data => this._renderItem(data)}
        onViewableItemsChanged={this._viewableItemsChanged}
        ref={this._listRef}
        initialNumToRender={this.props.initialNumToRender || 10} />
    )
  }
}
