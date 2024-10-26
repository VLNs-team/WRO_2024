#define Encoder_output_A 4 
#define Encoder_output_B 5 

#define G1 7
#define G2 8
#define G3 6

#define Volt A7 
int i=1;

int Count_pulses = 0;
void setup() {
Serial.begin(9600); 
pinMode(Encoder_output_A,INPUT); 
pinMode(Encoder_output_B,INPUT); 
pinMode(EN_R,OUTPUT);
pinMode(EN_L,OUTPUT);
pinMode(R_PWM,OUTPUT);
pinMode(L_PWM,OUTPUT);
pinMode(G1,OUTPUT);
pinMode(G2,OUTPUT);
pinMode(G3,OUTPUT);
attachInterrupt(digitalPinToInterrupt(Encoder_output_A),DC_Motor_Encoder,RISING);


digitalWrite(G1,1);
digitalWrite(G2,0);
digitalWrite(G3,0);
}


void loop() {
  double s=analogRead(Volt);
  double Voltt=(s*25)/1024.0;
  double Speed=-Count_pulses/3.0;
  if(Speed==0)
  {
    return;
  }
  Run(250);
  Serial.print("id:");
  Serial.print(i);
  i++;
  Serial.print(",speed:");
  Serial.print(Speed);
  Serial.print(",Voltage:");
  Serial.print(Voltt); 
  if(i%5==0)
  {
    Serial.println(".");
  }
  else
  {
    Serial.print(".    ");
  }
  Count_pulses = 0;
  if(Speed>=30)
  {
    digitalWrite(G3,1);
  }
  delay(500);
 
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