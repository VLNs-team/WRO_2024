#define Encoder_output_A 4 
#define Encoder_output_B 5 

#define G1 7
#define G2 8

#define Volt A7 
int i=1;

int Count_pulses = 0;
void setup() {
Serial.begin(9600); 
pinMode(Encoder_output_A,INPUT); 
pinMode(Encoder_output_B,INPUT); 

pinMode(G1,OUTPUT);
pinMode(G2,OUTPUT);
  
attachInterrupt(digitalPinToInterrupt(Encoder_output_A),DC_Motor_Encoder,RISING);


digitalWrite(G1,1);
digitalWrite(G2,0);
}


void loop() {
  double s=analogRead(Volt);
  double Voltt=(s*25)/1024.0;
  double Speed=-Count_pulses/3.0;

  Count_pulses = 0;
  if(Speed>=30)
  {
    digitalWrite(G3,1);
  }
  delay(30);
 
}
 
void DC_Motor_Encoder(){
  int b = digitalRead(Encoder_output_B);
  if(b > 0){
    Count_pulses++;
  }
  else{
    Count_pulses--;
  }
}
