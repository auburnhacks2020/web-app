import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Platform } from "react-native";
import { Header } from "../components";
import { layout, stylesheet } from "../constants";
import { Card, Button, Modal, Portal, Provider, Paragraph } from "react-native-paper";
import Collapsible from "react-native-collapsible";

export default function FAQScreen(props) {
  const [visible, setVisible] = useState(0);
  const [answer, setAnswer] = useState(0);
  let questions = [
    {
      id: 1,
      question: "What is a hackathon?",
      answer: 'We are not "hackers" as you would normally think of them. Hacking, in this context, involves working on a team (or alone, if you wish!) to put together a website, application, etc. This will be an event that will encourage you to innovate and build something cool, or just learn something new. Our partners, MLH, call it an "invention marathon."'
    },
    {
      id: 2,
      question: "When and where is AuburnHacks?",
      answer: "Brown Kopel Engineering Student Acheivement Center\n\nFebruary 8-9, 2020"
    },
    {
      id: 3,
      question: "What do I need to bring?",
      answer: "Bring your computer and whatever else you will need to code! Also, since it is an overnight event, bring a toothbrush as well as a sleeping bag! We will provide food, drinks, and caffeine, so you can focus on programming!"
    },
    {
      id: 4,
      question: "How much does it cost?",
      answer: "It's completely free to attend and participate! Just like any other Major League Hacking Event!"
    },
    {
      id: 5,
      question: "What if I don't know how to code?",
      answer: "No worries at all! We welcome participants of all majors and grade levels. Even if you just want to hang out and learn from our mentors, you may do so! Hackathons are a learning experience for everyone, so AuburnHacks will encourage that type of environment."
    },
    {
      id: 6,
      question: "What if I don't have a team?",
      answer: "You don't need a team to participate, although we do encourage it! If you don't have a team coming into the event, we will provide avenues for you to form a team onsite. Details will be provided on the day of the event."
    },
    {
      id: 7,
      question: "What will the prompt be?",
      answer: "We'll announce the hacking challenges when the event kicks off. Rest assured, we will have many different challenges to tackle, so if one doesn't capture your interest or skill level, you can try your hand at something else."
    },
    {
      id: 8,
      question: "Anything else I should know?",
      answer: "Major League Hacking has a code of conduct! We want everyone to be safe and comfortable at AuburnHacks. Before attending our event, please review the document here."
    },
    {
      id: 9,
      question: "What if I'm traveling by air?",
      answer: "If you're traveling by air, the closest airport to Auburn University is the Hartsfield-Jackson Atlanta International Airport, which is approximately an hour and forty minutes away (Please also note the change from Eastern to Central timezone). From the Atlanta airport, you have the option of taking Groome transportation. If there is enough interest, we will probably charter a bus from the airport to the event."
    }
  ];
  return (
    <Provider>
      <Portal>
        <ScrollView style={stylesheet.container}>
          <Header title="FAQ's" />
          <View style={stylesheet.row}>
            {questions.map(q => (
              <Card
                key={q.id}
                style={
                  layout.isBrowser
                    ? { width: "30%", marginBottom: 20 }
                    : { width: "100%", marginBottom: 20 }
                }
              >
                <Card.Title title={q.question} />
                <Card.Actions style={stylesheet.cardAction}>
                  <Button
                    mode="contained"
                    style={stylesheet.cardbtn}
                    onPress={() => {
                      setAnswer(q.answer);
                      setVisible(!visible);
                    }}
                  >
                    Answer
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        </ScrollView>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
            <Card style={{margin: 40}}>
              <Card.Content>
                <Paragraph>
                  {answer}
                </Paragraph>
              </Card.Content>
            </Card>
        </Modal>
      </Portal>
    </Provider>
  );
}

FAQScreen.navigationOptions = {};
