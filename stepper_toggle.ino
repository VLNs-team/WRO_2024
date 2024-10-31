const int dirPin  = 5;
const int stepPin = 4; 
const int enPin   = 6;

void setup() {
  pinMode(10, OUTPUT);
  pinMode(stepPin,OUTPUT); 
  pinMode(dirPin,OUTPUT);
  pinMode(enPin,OUTPUT);
  digitalWrite(enPin,HIGH);
  digitalWrite(10, HIGH);

  digitalWrite(dirPin,HIGH);

  for(int x = 0; x < 3000; x++) {

  digitalWrite(stepPin,HIGH); 

  delayMicroseconds(200); 

  digitalWrite(stepPin,LOW); 

  delayMicroseconds(200); 

  }
}

void loop() {
  // put your main code here, to run repeatedly:

}
