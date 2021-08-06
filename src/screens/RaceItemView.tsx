import React, { FC, useState, useEffect } from "react";
import { Race } from "@src/models/Race";
import { StyleSheet, Text, View } from "react-native";
import { timeDifferenceFormatting } from "@src/utils/TimeUtils";

export const RaceItemHeaderView: FC = () => {
  return (
    <View style={[styles.container, styles.headerContainer]}>
      <View style={styles.meetingNameBox}>
        <Text>
          Meeting name
        </Text>
      </View>
      <View style={styles.raceNumberBox}>
        <Text>
          Race number
        </Text>
      </View>
      <View style={styles.timerBox}>
        <Text>
          Start
        </Text>
      </View>
    </View>
  );
};

type Props = {
  race: Race,
  onOneMinutePassed: (raceId: string) => void
}

const RaceItemView: FC<Props> = ({
  race,
  onOneMinutePassed
}) => {

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (now.getTime() - raceStartTime.getTime() >= 1 * 60 * 1000) {
        onOneMinutePassed(race.race_id);
      }
    }, 300);

    return () => clearInterval(intervalID);
  }, []);

  const raceStartTime = new Date(race.advertised_start.seconds * 1000);
  const isPassed = currentTime.getTime() > raceStartTime.getTime();

  return (
    <View style={styles.container}>
      <View style={styles.meetingNameBox}>
        <Text>
          {race.meeting_name}
        </Text>
      </View>
      <View style={styles.raceNumberBox}>
        <Text>
          {race.race_number}
        </Text>
      </View>
      <View style={styles.timerBox}>
        <Text style={{color: isPassed ? "red" : "black"}}>
          {!isPassed ? "start in " : "started "}
          {timeDifferenceFormatting(currentTime, raceStartTime)}
          {isPassed ? " ago " : ""}
        </Text>
      </View>
    </View>
  );
}

export default RaceItemView;

const styles = StyleSheet.create({
  container: { 
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  meetingNameBox: {
    flex: 2,
    alignItems: 'center'
  },
  raceNumberBox: {
    flex: 1,
    alignItems: 'center'
  },
  timerBox: {
    flex: 2,
    alignItems: 'center'
  }
});