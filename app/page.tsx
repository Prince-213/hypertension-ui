"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";

let labels = [
  "Male Or Female [0/1]",
  "Enter Your Age e.g [20]",
  "Are you a current smoker? [ 0 for No | 1 for Yes ] ",
  "How many Cigarettes per day? e.g 2",
  "Do you take BPMeds? [0 for No | 1 for Yes] ",
  "Are you diabetic? ",
  "Enter value of your total level of Cholestoral?",
  "Enter value of systolic blood pressure?",
  "Enter Value of diastolic Blood pressure",
  "Enter Value of BMI",
  "Enter Value of heartRate",
  "Enter Value of glucose",
];

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);
  const [currentSmoker, setCurrentSmoker] = useState(0);
  const [cigarettesPerDay, setCigarettesPerDay] = useState(0);
  const [bpMeds, setBpMeds] = useState(0);
  const [diabetic, setDiabetic] = useState(0);
  const [totalCholestoral, setTotalCholestoral] = useState(0);
  const [systolicBloodPressure, setSystolicBloodPressure] = useState(0);
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [glucose, setGlucose] = useState(0);

  const [result, setResult] = useState("");

  const predict = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/api/predict",
      {
        gender: gender,
        age: age,
        currentSmoker: currentSmoker,
        cigsPerDay: cigarettesPerDay,
        BPMeds: bpMeds,
        diabetes: diabetic,
        totChol: totalCholestoral,
        sysBP: systolicBloodPressure,
        diaBP: diastolicBloodPressure,
        BMI: bmi,
        heartRate: heartRate,
        glucose: glucose,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await res.data;

    setResult(data.result);
    setOpenModal(true);

    console.log(result);

    /* const values = {
      gender,
      age,
      currentSmoker,
      cigarettesPerDay,
      bpMeds,
      diabetic,
      totalCholestoral,
      systolicBloodPressure,
      diastolicBloodPressure,
      bmi,
      heartRate,
      glucose,
    };

    console.log(values); */
  };

  return (
    <main className="flex items-center justify-center h-screen relative">
      {openModal && (
        <article className=" w-full h-screen absolute z-50 bg-[#00000079] flex justify-center items-center">
          <div className=" relative w-[50%] mx-auto h-fit p-10 bg-white rounded-xl flex flex-col items-center justify-center">
            <button onClick={() => setOpenModal(false)}>
              <XCircle className=" absolute top-5 right-5" />
            </button>

            <h1>Analysis complete</h1>
            <br />
            <Button
              className={clsx(" bg-emerald-500 text-white font-medium", {
                " bg-red-500": result == "Risk of Hypertension",
              })}
            >
              {result}
            </Button>
          </div>
        </article>
      )}

      <div className=" lg:w-[50%] w-[80%] h-fit rounded-3xl border-2 p-10 ">
        <div className=" space-y-2 border-b-2 border-gray-300 pb-8">
          <h1 className=" font-semibold text-3xl">
            Hypertension Risk Prediction System
          </h1>
          <p className=" text-gray-500">
            Prediction is done with the information below.
          </p>
        </div>

        <br />

        <form
          onSubmit={predict}
          method="POST"
          className=" grid gap-10 grid-cols-2"
        >
          <div className=" space-y-2">
            <h1 className=" font-medium ">Gender</h1>
            <Select onValueChange={(e) => setGender(Number(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="0">Male</SelectItem>
                  <SelectItem value="1">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Age</h1>
            <Input
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter your age"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Are you are current smoker</h1>
            <Select onValueChange={(e) => setCurrentSmoker(Number(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Are you a current smoker ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Smoker?</SelectLabel>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">How many cigarretes per day ?</h1>
            <Input
              onChange={(e) => setCigarettesPerDay(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Do you take BPMeds </h1>
            <Select onValueChange={(e) => setBpMeds(Number(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Do you take BPMeds ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>BPMeds?</SelectLabel>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Are you Diabetic ?</h1>
            <Select onValueChange={(e) => setDiabetic(Number(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Are you diabetic ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Diabetic ?</SelectLabel>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">
              Enter value of your total level of cholestoral
            </h1>
            <Input
              onChange={(e) => setTotalCholestoral(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">
              Enter the value of systolic blood pressure
            </h1>
            <Input
              onChange={(e) => setSystolicBloodPressure(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">
              Enter the value of diastolic blood pressure
            </h1>
            <Input
              onChange={(e) =>
                setDiastolicBloodPressure(Number(e.target.value))
              }
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Enter value of BMI</h1>
            <Input
              onChange={(e) => setBmi(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Enter value of heart rate</h1>
            <Input
              onChange={(e) => setHeartRate(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Enter value of glucose</h1>
            <Input
              onChange={(e) => setGlucose(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <Button variant={"default"} type="submit">
            Predict
          </Button>
        </form>
      </div>
    </main>
  );
}
