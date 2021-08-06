import React, {FC, useEffect, useState, useMemo} from 'react';
import { Race } from '@src/models/Race';
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native';
import RaceItemView, {RaceItemHeaderView} from './RaceItemView';
import { useDispatch, useSelector } from 'react-redux';
import { selectRaces } from '@src/redux/selectors/races';
import { actions } from '@src/redux/slices';

const categories = [
  {
    id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    name: 'Greyhound racing',
  },
  {
    id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
    name: 'Harness racing',
  },
  {
    id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
    name: 'Horse racing',
  },
];

const NextToGoScreen: FC = () => {
  const dispatch = useDispatch();
  const allRaces = useSelector(selectRaces);

  const [categoriesDeselected, setCategoriesDeselected] = useState<
    Map<string, boolean>
  >(new Map());

  const loadRaces = async () => {
    dispatch(actions.getRaces());
  };

  const handlePassedRace = (raceId: string) => {
    dispatch(actions.removeRace(raceId));
  };

  const categorySelectionColor = 'rgba(0,0,0,0.3)';

  const handleCategorySelection = (idx: number) => {
    const map = new Map<string, boolean>(categoriesDeselected);
    map.set(categories[idx].id, !map.get(categories[idx].id));
    setCategoriesDeselected(map);
  };

  useEffect(() => {
    loadRaces();
  }, []);

  const races = useMemo(() => {
    return allRaces.filter(
      (race: Race) => !categoriesDeselected.get(race.category_id),
    ).slice(0, 5);
  }, [allRaces, categoriesDeselected]);
  
  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <TouchableOpacity
          onPress={() => handleCategorySelection(0)}
          style={{
            ...styles.filterButtonsCommon,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderColor:
              categoriesDeselected.get(categories[0].id) === true
                ? categorySelectionColor
                : 'transparent',
            backgroundColor:
              categoriesDeselected.get(categories[0].id) === true
                ? 'transparent'
                : categorySelectionColor,
          }}>
          <Text style={{fontSize: 12}}>Greyhound racing</Text>
        </TouchableOpacity>
        <View style={styles.filterVerDividers} />
        <TouchableOpacity
          onPress={() => handleCategorySelection(1)}
          style={{
            ...styles.filterButtonsCommon,
            borderColor:
              categoriesDeselected.get(categories[1].id) === true
                ? categorySelectionColor
                : 'transparent',
            backgroundColor:
              categoriesDeselected.get(categories[1].id) === true
                ? 'transparent'
                : categorySelectionColor,
          }}>
          <Text style={{fontSize: 12}}>Harness racing</Text>
        </TouchableOpacity>
        <View style={styles.filterVerDividers} />
        <TouchableOpacity
          onPress={() => handleCategorySelection(2)}
          style={{
            ...styles.filterButtonsCommon,
            borderColor:
              categoriesDeselected.get(categories[2].id) === true
                ? categorySelectionColor
                : 'transparent',
            backgroundColor:
              categoriesDeselected.get(categories[2].id) === true
                ? 'transparent'
                : categorySelectionColor,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}>
          <Text style={{fontSize: 12}}>Horse racing</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={races}
        renderItem={({item}) => (
          <RaceItemView race={item} onOneMinutePassed={handlePassedRace} />
        )}
        keyExtractor={item => item.race_id}
        ListHeaderComponent={<RaceItemHeaderView />}
      />
    </View>
  );
};

export default NextToGoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterView: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerRightButton: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonsCommon: {
    height: 24,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  filterVerDividers: {
    width: 1,
    backgroundColor: 'grey',
    height: 24,
  },
});
