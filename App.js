import React from 'react';

import {
  StyleSheet,
  Text, View, StatusBar,
  ScrollView, TextInput,
  TouchableOpacity, FlatList,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    value: '',
    todos: [],
    filterBy: null,
  }

  renderItem = ({ item: { id, desc, done, } }) => (
    <TouchableOpacity onPress={() => this.changeStatus(id)} style={{ flexDirection: 'row', marginVertical: 10 }}>
      <Feather
        name={done ? 'check-square' : 'square'}
        color={done ? '#f46242' : '#fff'}
        size={20}
      />
      <Text
        style={{
          paddingHorizontal: 15,
          fontSize: 18,
          color: done ? '#f46242' : '#fff',
          textDecorationLine: done ? "line-through" : "none"
        }}
      >
        {desc}
      </Text>
    </TouchableOpacity>
  );

  changeStatus = id => {
    let { todos } = this.state;
    todos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        }
      }
      return todo;
    });
    this.setState({ todos })
  }

  addTodo = () => {
    const { todos, value } = this.state;
    this.setState({
      todos: [...todos, {
        id: todos.length + 1,
        desc: value,
        done: false
      }],
      value: '',
    })
  }


  handleTextChange = value => this.setState({ value })

  changeFilter = filterBy => this.setState({ filterBy })

  render() {
    const { value, todos, filterBy } = this.state;
    const data = filterBy === null ? todos : todos.filter(todo => filterBy ? todo.done : !todo.done);
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>BABY SHARK</Text>
          <View style={styles.subTitleContainer}>
            <Text style={[styles.subTitle, { fontWeight: '800' }]}>TODO</Text>
            <Text style={styles.subTitle}>-dodoodddoooo</Text>
          </View>
        </View>

        <View style={styles.entry}>
          <TextInput
            value={value}
            style={styles.textInput}
            placeholder="Add a To-Do"
            onChangeText={this.handleTextChange}
          />
          <TouchableOpacity onPress={this.addTodo}>
            <AntDesign name="pluscircle" color="#f46242" size={40} />
          </TouchableOpacity>

        </View>

        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterContainer, { backgroundColor: filterBy === null ? "#f46242" : '#fff' }]}
            onPress={() => this.changeFilter(null)}
          >
            <Text style={styles.filter}>ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterContainer, { backgroundColor: filterBy === false ? "#f46242" : '#fff' }]}
            onPress={() => this.changeFilter(false)}
          >
            <Text style={styles.filter}>ACTIVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterContainer, { backgroundColor: filterBy ? "#f46242" : '#fff' }]}
            onPress={() => this.changeFilter(true)}
          >
            <Text style={styles.filter}>DONE</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            style={styles.todos}
            data={data}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={(item) => JSON.stringify(item)}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0121',
  },
  titleContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  title: {
    color: '#f46242',
    fontWeight: '900',
    fontSize: 30,
  },
  subTitleContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  subTitle: {
    color: '#fff',
  },
  entry: {
    flexDirection: 'row',
    margin: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  todos: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  filters: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  filterContainer: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  filter: {
    paddingHorizontal: 30,
    lineHeight: 40,
  }
});
