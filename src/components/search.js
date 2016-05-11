
import React, {
  AppRegistry,
  Component,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Matches from './matches.js';

// import TopNavBar from './topnavbar.js';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    console.log(state, context.state);
  }

  handleConfirm() {
    // check if user has enough currency
      // if so, take currency from user's wallet and connect users
      // else, display error
  }

  handleMatches() {
    this.props.navigator.push({
      name: 'Matches',
      component: Matches,
    });
  }

  handleDelete() {
    // update status in the Match table to unliked display the next person
  }

  handleNext() {
    // when someone clicks the check mark, display the next person in the queue
  }

  handleMenu() {
    // Redirect to edit profile page once implemented...
  }

  render() {
    // this.props.actions.setCurrentPage('search');
    return (
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMenu.bind(this)}
          >
          </TouchableOpacity>

          <View style={styles.titleBox}>
            <Text style={styles.titleBoxText}>Papayatary</Text>
          </View>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMatches.bind(this)}
          >
            <Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.swiperOuterContainer}>
          <Swiper 
            nextButton={(<Text style={styles.swiperText}>›</Text>)}
            prevButton={(<Text style={styles.swiperText}>‹</Text>)}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            showsButtons={true}
            buttonWrapperStyle={styles.swiperButton}
          >
            <View style={styles.swiperInnerContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.profileLeft}>
                  <Text style={styles.profileText}>
                    Blake Lively
                  </Text>
                  <Text style={styles.profileText}>
                    Age: 28
                  </Text>
                </View>
                <View style={styles.profileRight}>
                  <Text style={styles.profileText}>
                    Resting HR: 62
                  </Text>
                  <Text style={styles.profileText}>
                    Avg Daily Steps: 5000
                  </Text>
                </View> 
              </View>
              <Image
                style={styles.image}
                source={require('../images/blakelively001.jpg')}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.checkButton}
                  onPress={this.handleDelete.bind(this)}
                >
                  <Icon style={styles.checkIcon} name="times-circle" size={32} color="navy" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.button}
                  onPress={this.handleConfirm.bind(this)}
                >
                  <Text style={styles.buttonText}>Send 5000 Steps</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.checkButton}
                  onPress={this.handleNext.bind(this)}
                >
                  <Icon style={styles.checkIcon} name="check-circle" size={32} color="mediumvioletred" />
                </TouchableOpacity>
              </View>
              <View style={styles.balanceBox}>
                <Text style={styles.balanceText}>
                  Your Balance:  50,000 Steps
                </Text>
              </View>
            </View>
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    height: 64,
  },
  swiperOuterContainer: {
    height: 603,
    width: 375,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Arial',
  },
  swiperInnerContainer: {
    height: 603,
    width: 375,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    top: -40,
  },
  titleBox: {
    width: 255,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBoxText: {
    color: 'white',
    fontSize: 22,
  },
  navButton: {
    width: 60,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonIcon: {
    alignSelf: 'center',
    color: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    height: 72,
    width: 340,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'azure',
    marginTop: 6,
    marginBottom: 6,
    // borderColor: 'lightgray',
    // borderWidth: 2,
  },
  profileLeft: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  profileRight: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  profileText: {
    fontSize: 16,
    color: 'navy',
  },
  image: {
    resizeMode: 'contain', // cover, contain, stretch, auto
    height: 460,
    width: 340,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    overflow: 'visible',
    shadowColor: 'grey',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 6,
    height: 90,
    width: 375,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  checkButton: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  button: {
    margin: 12,
    padding: 8,
    width: 250,
    height: 42,
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // shadowColor: 'gray',
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 2,
    // shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  balanceBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 24,
    width: 375,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  balanceText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 18,
  },
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
