import {firebase} from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatRoom = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={[
          {
            _id: 1,
            text: 'udev',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]}
        onSend={messages => {
          console.log({messages});
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chat-room');
        }}
        style={{backgroundColor: 'gray', borderRadius: 5, padding: 5}}>
        <Text>udev</Text>
        <Text>randomUser</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const db = firebase.firestore();
  const chatsRef = db.collection('chats');

  useEffect(() => {
    // // collection -> doc -> collection :'(
    // const unsubscribe = chatsRef
    //   // .doc('iIb7cKib6nyBSFBIW6w7')
    //   .onSnapshot(documentSnapshot => {
    //     // console.log({documentSnapshot: documentSnapshot.docs()});
    //     documentSnapshot.docChanges().forEach(({doc}) => {
    //       console.log({data: doc.id});
    //       console.log({data: doc.data()});
    //     });
    //   });

    // // Stop listening for updates when no longer required
    // return () => unsubscribe();

    const unsubscribe = chatsRef
      .where('receiverId', '==', 'randomId')
      .onSnapshot(snapShot => {
        snapShot.docs.map(doc => {
          console.log({doc: doc.data()});
          doc.ref.update({byCode: true});
        });
      });

    return () => unsubscribe();
  }, []);

  const RooStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RooStack.Navigator initialRouteName="home">
        <RooStack.Screen name="home" component={Home} />
        <RooStack.Screen name="chat-room" component={ChatRoom} />
      </RooStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
