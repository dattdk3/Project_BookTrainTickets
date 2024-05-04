import { TripModel } from "@/model/trip/TripModel";
import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
const DataContext = createContext({
  data: {} as any,
  updateData: ({}: any) => {},
});
interface MyComponentProps {
  children: ReactNode;
  tripDetail: TripModel;
}
const DataProvider: React.FC<MyComponentProps> = ({ children, tripDetail }) => {
  const [data, setData] = useState({
    tripId: tripDetail.tripId,
    pickupPoint: JSON.parse(tripDetail.stationsMapping)[//   .filter(
    //     (s: { [key: string]: any }) =>
    //       s["from"] == props.trip.startCity
    //   )}
    0]["station"],
    dropoffPoint: JSON.parse(tripDetail.stationsMapping)[//   .filter(
    //     (s: { [key: string]: any }) =>
    //       s["from"] == props.trip.endCity
    //   )}
    0]["station"],
    price: JSON.parse(tripDetail.stationsMapping)[//   .filter(
    //     (s: { [key: string]: any }) =>
    //       s["from"] == props.trip.startCity
    //   )}
    0]["price"],
    selectedSeats: [],
    tickets: []
  });

  const updateData = (newData: {}) => {
    console.log(data)
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useDataContext };
