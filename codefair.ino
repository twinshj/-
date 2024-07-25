#include <SoftwareSerial.h>

SoftwareSerial espSerial(2, 3); // RX, TX
  int touchsensor = 7;
  int FSRsensor = A0;
  int lasttime=0;
// Function declarations
void sendCommand(String command);
void sendData(String data);
void waitForResponse();

void setup() {
  Serial.setTimeout(50);

  Serial.begin(9600); // Arduino serial communication setup
  espSerial.begin(9600); // ESP8266 serial communication setup
  
  // ESP8266 initialization
  sendCommand("AT+RST");
  delay(2000);
  
  // Set to single connection mode
  sendCommand("AT+CIPMUX=0");
  
  // Connect to Wi-Fi
  sendCommand("AT+CWJAP=\"Ssjeb\",\"10987654321\"");
  delay(5000); // Wait for Wi-Fi connection

  // Start TCP connection
  sendCommand("AT+CIPSTART=\"TCP\",\"192.168.212.94\",12345");

  pinMode(touchsensor, INPUT);
}

void loop() {
  // Send data
  int x1 = millis();
  if(digitalRead (touchsensor) == HIGH && analogRead(FSRsensor) > 100){
    sendData(x1-lasttime);
    lasttime = x1;
  } // 5-second interval for data transmission
}

void sendCommand(String command) {
  espSerial.println(command);
  waitForResponse();
}

void sendData(int x1) {
  // Construct data string with variables
  String data = String(x1);
  
  // Initiate data transmission command
  sendCommand("AT+CIPSEND=" + String(data.length() + 2)); // +2 to account for potential two-digit values
  
  delay(100);
  
  // Actual data transmission
  espSerial.println(data);
  //delay(100);
}

void waitForResponse() {
  delay(1000);
  while (espSerial.available() > 0) {
    char c = espSerial.read();
    Serial.print(c);
  }
  Serial.println();
}