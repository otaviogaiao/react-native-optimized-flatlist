# react-native-optimized-flatlist

[![Greenkeeper badge](https://badges.greenkeeper.io/stoffern/react-native-optimized-flatlist.svg)](https://greenkeeper.io/)
![](https://img.shields.io/npm/v/react-native-optimized-flatlist.svg)

__Optimization for FlatLists. This is a fix over the FlatList that removed every item that is not inside the viewport. This will give a more stable and faster FlatList as performance dont drop! :)__

Please also read more about the issue here:
https://github.com/facebook/react-native/issues/13413

## Installation
```
npm i -S react-native-optimized-flatlist
```
or
```
yarn add react-native-optimized-flatlist
```


## Usage
Just replace `FlatList` with `OptimizedFlatList` .. thats all! :)

Replace this:
```js
render() {
  return (
  <FlatList
    data={[{name: 'fred', name: 'freddy'}]}
    renderItem={ ({item}) => <View>{item.name}</View>}
    />
...
```
With this:

```js
...
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

...
render() {
  return (
  <OptimizedFlatList
    data={[{name: 'fred', name: 'freddy'}]}
    renderItem={ ({item}) => <View>{item.name}</View>}
    />
...

```

### OptimizedSectionList (experimental)

Just replace SectionList with OptimizedSectionList, like this:

	....
	import { OptimizedSectionList } from "react-native-optimized-flatlist";
	...
	
	render(){
		...
		return (
		   <OptimizedSectionList
	        sections={sections}
	        ListEmptyComponent={this.renderEmptyListComponent()}
	        style={styles.listContainer}
	        renderItem={this.renderItem}
	        renderSectionHeader={this.renderSectionHeader}
	        stickySectionHeadersEnabled={false}
	        keyExtractor={this.keyExtractor}
	        refreshing={carregandoIngressos}
	        onRefresh={this.props.getIngressos}
	        ListHeaderComponent={this.renderListHeader}
	        viewabilityConfig={this.viewabilityConfig}
	      />
		)
	 }
 
**Warning: The section object MUST have an unique key.**

      sections = {
        title: "Eventos Anteriores",
        data: ingressosExpirados,
        key: "passados"
      };
      
Read [https://github.com/filipemerker/flatlist-performance-tips/]() for performance improvement. Most of what its said in this article applies to SectionLists as well. In my case I had to change viewabilityConfig, updateCellsBatchingPeriod and windowSize.