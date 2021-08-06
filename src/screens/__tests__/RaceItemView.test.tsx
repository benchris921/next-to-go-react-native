import React from "react";
import { render } from "@testing-library/react-native";
import RaceItemView from "../RaceItemView";
import { mockedRace } from "@src/__mocks__/Race.mock";
 
 it('Cell renders correctly', async () => {
  const fn = jest.fn();
  const emptyState = render(<RaceItemView race={mockedRace} onOneMinutePassed={fn} />);
  expect(emptyState).not.toBeNull();
 });
 