
import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';
import SearchBar from 'react-native-search-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

var GiftedMessenger = require('react-native-gifted-messenger');
var Communications = require('react-native-communications');

var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;

class Messages extends React.Component {
  constructor(props) {
    super(props);
    
    this._isMounted = false;
    this._messages = this.getInitialMessages();
    
    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    };
    
  }
  
  componentDidMount() {
    this._isMounted = true;    
    
    setTimeout(() => {
      this.setState({
        typingMessage: 'React-Bot is typing a message...',
      });
    }, 1000); // simulating network

    setTimeout(() => {
      this.setState({
        typingMessage: '',
      });
    }, 3000); // simulating network
    
    
    setTimeout(() => {
      this.handleReceive({
        text: 'Hello Awesome Developer', 
        name: 'React-Bot', 
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
        position: 'left', 
        date: new Date(),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      });
    }, 3300); // simulating network
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  getInitialMessages() {
    return [
      {
        text: 'Are you building a chat app?', 
        name: 'React-Bot', 
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
        position: 'left', 
        date: new Date(2016, 3, 14, 13, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: "Yes, and I use Gifted Messenger!", 
        name: 'Awesome Developer', 
        image: null, 
        position: 'right', 
        date: new Date(2016, 3, 14, 13, 1),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];
  }
  
  setMessageStatus(uniqueId, status) {
    let messages = [];
    let found = false;
    
    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        let clone = Object.assign({}, this._messages[i]);
        clone.status = status;
        messages.push(clone);
        found = true;
      } else {
        messages.push(this._messages[i]);
      }
    }
    
    if (found === true) {
      this.setMessages(messages);
    }
  }
  
  setMessages(messages) {
    this._messages = messages;
    
    // append the message
    this.setState({
      messages: messages,
    });
  }
  
  handleSend(message = {}) {
    
    // Your logic here
    // Send message.text to your server
    
    message.uniqueId = Math.round(Math.random() * 10000); // simulating server-side unique id generation
    this.setMessages(this._messages.concat(message));
    
    // mark the sent message as Seen
    setTimeout(() => {
      this.setMessageStatus(message.uniqueId, 'Seen'); // here you can replace 'Seen' by any string you want
    }, 1000);

    // if you couldn't send the message to your server :
    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
  }
  
  onLoadEarlierMessages() {

    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    });
    
    // Your logic here
    // Eg: Retrieve old messages from your server

    // IMPORTANT
    // Oldest messages have to be at the begining of the array
    var earlierMessages = [
      {
        text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native', 
        name: 'React-Bot', 
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
        position: 'left', 
        date: new Date(2016, 0, 1, 20, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      }, {
        text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text', 
        name: 'Awesome Developer', 
        image: null, 
        position: 'right', 
        date: new Date(2016, 0, 2, 12, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];

    setTimeout(() => {
      this.setMessages(earlierMessages.concat(this._messages)); // prepend the earlier messages to your list
      this.setState({
        isLoadingEarlierMessages: false, // hide the loader
        allLoaded: true, // hide the `Load earlier messages` button
      });
    }, 1000); // simulating network
    
  }
  
  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    this.setMessages(this._messages.concat(message));
  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '');
  }
  
  // will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    // Your logic here
    // Eg: Navigate to the user profile
  }
  
  render() {
    // console.log('Messenger this.props: ', this.props);
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
    
        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff',
          },
        }}
        
        autoFocus={false}
        messages={this.state.messages}
        handleSend={this.handleSend.bind(this)}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

        loadEarlierMessagesButton={!this.state.allLoaded}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

        senderName='Awesome Developer'
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}
        
        parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}
        
        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
        
        typingMessage={this.state.typingMessage}
      />
    );
  }
  
  handleUrlPress(url) {
    Linking.openURL(url);
  }

  // TODO
  // make this compatible with Android
  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;
    
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  }
  
  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

}

// const styles = StyleSheet.create({
//   // iPhone 6 width is 375, height is 667, statusBar around 7
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: 'azure',
//   },
//   navContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     backgroundColor: 'steelblue',
//     alignSelf: 'stretch',
//     height: 64,
//   },
//   titleBox: {
//     width: 255,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 44,
//   },
//   titleBoxText: {
//     color: 'white',
//     fontSize: 22,
//   },
//   navButton: {
//     width: 60,
//     height: 44,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   buttonIcon: {
//     alignSelf: 'center',
//     color: 'white',
//   },
//   matchListContainer: {
//     height: 560 ,
//     width: 340,
//     alignSelf: 'center',
//     alignItems: 'flex-start',
//     padding: 4,
//     marginTop: 20,
//     marginBottom: 20,
//     backgroundColor: 'lightgray',
//   },
//   matchItemContainer: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     height: 80,
//     width: 332,
//     padding: 4,
//     marginBottom: 4,
//     backgroundColor: 'white',
//   },
//   thumbImageContainer: {
//     width: 72,
//     height: 72,
//   },
//   thumbImage: {
//     width: 72, 
//     height: 72,
//     resizeMode: 'contain',
//   },
//   messagesContainer: {
//     //flex: 82,
//   },
//   messageText: {
//     fontSize: 14,
//     color: 'navy',
//   },
//   button: {
//     backgroundColor: 'azure',
//     padding: 10,
//     height: 72,
//     width: 250,
//   },
//   buttonText: {
//     fontSize: 20
//   }
// });

function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages); 
