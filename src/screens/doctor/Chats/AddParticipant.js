import React from 'react';
import {View, StyleSheet,Text, ScrollView,TouchableOpacity,Image} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import Feather from 'react-native-vector-icons/Feather';
import Section from '../../../components/molecules/Section/Section';
import Filter from '../../../assets/svg/filter.svg';
import DmzSearchbar from '../../../components/molecules/DmzSeachbar/DmzSearchbar';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import { ListItem } from 'react-native-elements'


class AddParticipant extends React.Component{
  state = {
   search: '',
 };
 updateSearch = (search) => {
   this.setState({ search });
 };
  render(){
     const { search } = this.state;
     const list = [
       {
         title: 'Nalin',
         avatar:require("../../../assets/jpg/person1.jpg")
       },
       {
         title: 'Vasu',
         avatar:require("../../../assets/jpg/person1.jpg")
       },
     ]
    return(
      <View>
      <FancyHeader
      profileMode={true}
      headerText="Add Participant"
        style={{
          Container: {height: '25%'},
        }}>
    </FancyHeader>
      <Container
        style={{
          height: '80%',
          transform: [{translateY: -50}],
          zIndex: 999,
        }}>
      <View>
        <Feather name="users" size={20} style={{left:50,top:40}}/>
        <Feather name="users" size={20} style={{left:350,top:20}}/>
      </View>
      <View style={{flex:1,flexDirection:"column"}}>
        <Text style={{textAlign:"center",position:"relative",fontStyle:"italic"}}>250 participants</Text>
      <DmzSearchbar placeholder={'seach participant'} />

      <View style={{left:20,}}>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftAvatar={{ rounded: true, source: item.avatar}}
            />
          ))
        }
      </View>
      </View>
    </Container>
    </View>
    );
  }
}

export default AddParticipant
