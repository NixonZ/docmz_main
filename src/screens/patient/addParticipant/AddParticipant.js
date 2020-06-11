import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import {Image} from 'react-native-animatable';
import {
  TouchableOpacity,
  FlatList,
  // TextInput,
} from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';

const AddParticipant = ({navigation}) => {
  const [search, setSearch] = useState('emp');
  const [contacts, setContacts] = useState([]);
  var inputRef = null;
  console.log(JSON.stringify(contacts));

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(() => {
        console.log('permission?');
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
          } else {
            // contacts returned in Array
            setContacts(
              contacts.map(item => ({
                name: item.givenName + ' ' + item.familyName,
                phoneNumbers: item.phoneNumbers,
                hasThumbnail: item.hasThumbnail,
                thumbnailPath: item.thumbnailPath,
                key: item.recordID,
              })),
            );
          }
        });
      })
      .catch(error => console.log(JSON.stringify(error)));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeaderLite
        navigation={navigation}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Add Participant'}
        style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
      />
      <Container
        style={{
          height: '85%',
          transform: [{translateY: -30}],
          zIndex: 999,
          backgroundColor: '#fff',
          padding: 5,
          paddingTop: 15,
        }}>
        <View style={[styles.search]}>
          <TouchableOpacity
            style={[styles.row, {marginVertical: 0}]}
            onPress={() => (inputRef !== null ? inputRef.focus() : null)}>
            <Image
              source={require('../../../assets/icons/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              value={search}
              onChangeText={text => setSearch(text)}
              style={[styles.searchInput]}
              placeholder="Search"
              ref={ref => (inputRef = ref)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.topBar}>
          <Image
            source={require('../../../assets/icons/icon1.png')}
            style={styles.smallIcons}
          />
          <Text style={{opacity: search.length === 0 ? 1 : 0}}>
            {contacts.length} contacts
          </Text>
          <Image
            source={require('../../../assets/icons/icon1.png')}
            style={[styles.smallIcons, {opacity: search.length === 0 ? 1 : 0}]}
          />
        </View>
        <FlatList
          style={styles.list}
          data={contacts.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({item}) => {
            var imagePath = item.hasThumbnail
              ? {uri: item.thumbnailPath}
              : require('../../../assets/jpg/person1.jpg'); //insert placeholder image here
            var pos = item.name.toLowerCase().indexOf(search.toLowerCase());
            return (
              <View style={styles.row}>
                <Image source={imagePath} style={styles.contactImage} />
                <Text style={styles.text}>{item.name.slice(0, pos)}</Text>
                <Text style={[styles.text, {color: '#6230CC'}]}>
                  {item.name.slice(pos, pos + search.length)}
                </Text>
                <Text style={styles.text}>
                  {item.name.slice(pos + search.length)}
                </Text>
              </View>
            );
          }}
        />
      </Container>
    </View>
  );
};

export default AddParticipant;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  smallIcons: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  contactImage: {
    height: 40,
    width: 40,
    marginEnd: 10,
    borderRadius: 25,
    borderColor: '#F7C033',
    borderWidth: 3,
  },
  text: {
    fontSize: 22,
  },
  list: {
    margin: 30,
    marginBottom: 0,
    flex: 1,
  },
  search: {
    // position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    top: -75,
    marginBottom: -50,
    marginHorizontal: '10%',
    width: '80%',
  },
  searchIcon: {
    marginHorizontal: 10,
    marginStart: 20,
  },
  searchInput: {
    flex: 1,
    padding: 5,
  },
});
