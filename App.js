import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import Task from './components/Task'

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const today = new Date()


  const addTask = () => {
    Keyboard.dismiss()
    if (task === null) {
      openModal()
    } else {
      setTaskItems([...taskItems, task])
    }
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
    openModal()
  }

  const openModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn không định làm gì à?
            </Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => completeTask()}
              >
                <Text style={styles.textStyle}>Tiếp tục</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn đã hoàn thành công việc này chưa?
            </Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => completeTask()}
              >
                <Text style={styles.textStyle}>Đã hoàn thành</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Chưa hoàn thành</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Công việc cần làm</Text>
        <Text style={styles.date}>Ngày: {today.toISOString().substring(0, 10).split('-').reverse().join('-')}</Text>
        <View style={styles.listItems}>
          <Task text={'Thức dậy'} />
          <Task text={'Check E-mail'} />
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => openModal()}>
                <Task key={index} text={item} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Viết một công việc'}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listItems: {
    marginTop: 35,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#8554C9',
    marginHorizontal: 5,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 24,
  },
})
