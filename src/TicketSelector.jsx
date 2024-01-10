import React, { useState } from "react";
import { Input, Button, Select, Checkbox, Modal } from "antd";
import { AppointmentPicker } from "react-appointment-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TicketSelector.css";
const { Option } = Select;

const TicketSelector = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [preferredTime, setPreferredTime] = useState("");
  const [days, setDays] = useState([
    [
      { id: 1, number: 1, periods: 1 },
      { id: 2, number: 2 },
      null,
      { id: 3, number: "0", isReserved: true },
      { id: 4, number: "4" },
      null,
      { id: 5, number: 5 },
      { id: 6, number: 6 },
    ],
  ]);

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb,
  }) => {
    console.log(
      `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
    );
    addCb(day, number, time, id);
    setSelectedDates([...selectedDates, { day, number, time, id }]);
  };

  const removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    console.log(
      `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
    );
    removeCb(day, number);
    setSelectedDates(
      selectedDates.filter((appointment) => appointment.id == id)
    );
  };

  const handleReserveNow = () => {
    console.log("Reserved dates:", selectedDates);
    const newDay = days[0].map((time) => {
      const found = selectedDates.find(
        (selectedTime) => selectedTime?.id == time?.id
      );
      if (found)
        return {
          ...time,
          isReserved: true,
        };
      else return time;
    });

    setDays([newDay]);
  };

  const success = () => {
    Modal.success({
      content: "Orari u rezervua me suksess",
    });
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleLastnameChange = (event) => {
    const { value } = event.target;
    setLastName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePhoneNrChange = (event) => {
    const { value } = event.target;
    setPhoneNr(value);
  };

  return (
    <div className="App" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div
        style={{
          backgroundColor: "#CFD2F0",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <div>
          <h2>Rezervoni Takimin</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Name Section */}
          <div
            style={{
              backgroundColor: "#949ee4",
              padding: "20px",
              borderRadius: "15px",
              margin: "10px",
            }}
          >
            <div className="input-section">
              <div className="input-wrap">
                {" "}
                <b>Emri </b>{" "}
                <Input
                  placeholder="Emri"
                  value={name}
                  onChange={handleNameChange}
                />{" "}
              </div>
              <div className="input-wrap">
                <b>Mbiemri</b>
                <Input
                  placeholder="Mbiemri"
                  value={lastName}
                  onChange={handleLastnameChange}
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="input-section">
              <div className="input-wrap">
                <b>E-mail</b>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="input-wrap">
                <b>Numri tel.</b>
                <Input
                  placeholder="Numri tel."
                  value={phoneNr}
                  onChange={handlePhoneNrChange}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                margin: "10px 0px",
              }}
            >
              <b>Njoftimi drejt :</b>
              <div
                style={{
                  marginLeft: "20px",
                }}
              >
                <Checkbox defaultChecked>Email</Checkbox>{" "}
                <Checkbox defaultChecked>SMS</Checkbox>{" "}
              </div>
            </div>

            {/* Arsyeja e vizites : */}
            <b>Arsyeja e vizites :</b>
            <div className="selection-section">
              <Select
                placeholder="Arsyeja e vizites"
                value={selectedReason}
                onChange={(value) => setSelectedReason(value)}
                style={{ width: "100%" }}
              >
                <Option value="ORL">Dhimbje veshi</Option>
                <Option value="Eye glasses Exam">Kontroll Sysh</Option>
                <Option value="General Cardiology">EKG</Option>
              </Select>

              <Select
                placeholder="Zgjidh Doktorin"
                value={selectedDoctor}
                onChange={(value) => setSelectedDoctor(value)}
                style={{ width: "100% " }}
              >
                <Option value="Doctor 1">Doktori ORL </Option>
                <Option value="Doctor 2">Doktori Okulist</Option>
                <Option value="Doctor 3">Doktori Zemres</Option>
              </Select>
            </div>

            {/* Zgjidh daten */}
            <div className="date-time-section">
              <div className="input-wrap">
                <b>Zgjidh daten</b>
                <DatePicker
                  placeholder="Zgjidh daten"
                  selected={currentDate}
                  onChange={(value) => {
                    setCurrentDate(value);
                    console.log("current value", value);
                  }}
                  style={{
                    width: "100%",
                  }}
                  dateFormat={"dd/MM/yyyy"}
                />
              </div>

              {/* Koha Preferuar */}
              <div className="input-wrap">
                <b>Koha Preferuar</b>
                <Select
                  value={preferredTime}
                  placeholder="Morning"
                  onChange={(value) => setPreferredTime(value)}
                  style={{
                    width: "100%",
                  }}
                >
                  <Option value="Show All">Shfaq te gjitha</Option>
                  <Option value="Morning">Mengjes</Option>
                  <Option value="Evening">Pasdite</Option>
                </Select>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#949ee4",
              padding: "20px",
              borderRadius: "15px",
              margin: "10px",
            }}
          >
            <div className="appointment-picker">
              <AppointmentPicker
                unitTime={30 * 60 * 1000}
                days={days}
                visible
                selectedByDefault
                maxReservableAppointments={3}
                initialDay={currentDate}
                addAppointmentCallback={addAppointmentCallback}
                removeAppointmentCallback={removeAppointmentCallback}
              />
            </div>

            <div className="button-section">
              <Button type="default" htmlType="reset">
                Rivendos
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#2E3DA2" }}
                onClick={() => {
                  handleReserveNow();
                  success();
                  setName("");
                  setLastName("");
                  setEmail("");
                  setPhoneNr("");
                  setSelectedReason(null);
                  setSelectedDoctor(null);
                }}
              >
                REZERVO TANI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
