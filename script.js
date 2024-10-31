let infoBoxVisible = [false,false,false,false,false,false,false,false,false];
let clickListener = [];

// Function to toggle the information box
function toggleInfoBox(event, s, count) {
    event.stopPropagation(); // Stop event from bubbling up
    const infoBox = document.getElementById(s);
    
    if (!infoBoxVisible[count]) {
        // Show the info box
        infoBox.style.display = 'block';

        /* const iconPosition = event.target.getBoundingClientRect();
        infoBox.style.top = (window.scrollY + iconPosition.bottom + 5) + 'px';  // 5px below the icon
        infoBox.style.left = (iconPosition.left) + 'px';  // Align to the left of the icon*/

        if (clickListener[count]) {
            document.removeEventListener('click', clickListener[count]);
        }

        clickListener[count] = function(event) {
            handleClickOutside(event, s, count);
        };
        // Set a short delay to prevent immediate closing due to event bubbling
        setTimeout(() => {
            document.addEventListener('click', clickListener[count]);
        }, 10);

        infoBoxVisible[count] = true;
    } else {
        hideInfoBox(s,count); // Hide if already visible
    }
}

// Function to hide the information box
function hideInfoBox(s,count) {
    const infoBox = document.getElementById(s);
    infoBox.style.display = 'none';
    infoBoxVisible[count] = false;

    if (clickListener[count]) {
        document.removeEventListener('click', clickListener[count]);
        clickListener[count] = null; // Reset the listener
    }// Remove the event listener
}

// Event listener to handle clicks outside of the info box
function handleClickOutside(event,s,count) {
    const infoBox = document.getElementById(s);
    if (infoBox && !infoBox.contains(event.target) && !event.target.matches('.info-icon')) {
        hideInfoBox(s,count); // Hide the info box if clicked outside
    }
}
// Activate Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
let r_b = 0.2;
const e = 80/100;
const g= 9.81;
let t_b = 25;
const pi = 3.14159265359;
let bn = 1

function changebn()
{
    const bump_n = document.getElementById('bumps_number').value;
    const bump_nn = parseFloat(bump_n) || 0;
    bn = bump_nn;
}
function changer()
{
    const bumps_radius = document.getElementById('bumps_radius').value;
    const bumps_radiusn = parseFloat(bumps_radius) || 0;
    r_b = bumps_radiusn;
}
function changea()
{
    const bumps_angle = document.getElementById('bumps_angle').value;
    const bumps_anglen = parseFloat(bumps_angle) || 0;
    t_b = bumps_anglen;
}

function autoCalculate12() {
    autoCalculate1();
    autoCalculate2();
}
function autoCalculate23() {
    autoCalculate3();
    autoCalculate2();
}
function autoCalculate34() {
    autoCalculate3();
    autoCalculate4();
}
function autoCalculate1() {
    const Discharge_time = document.getElementById('Discharge_time').value;
    const Power = document.getElementById('Power').value;
    const Energy = document.getElementById('Energy').value;

    const inputs = [Discharge_time, Power, Energy];
    const filledInputs = inputs.filter(input => input !== '').length;

    if (filledInputs === 2) {
        // Convert to numbers for calculation
        const Discharge_timen = parseFloat(Discharge_time) || 0;
        const Powern = parseFloat(Power) || 0;
        const Energyn = parseFloat(Energy) || 0;


        if (Discharge_time === '') {
            document.getElementById('Discharge_time').value = Energyn/Powern; // Example equation
        } else if (Power === '') {
            document.getElementById('Power').value = Energyn/Discharge_timen; // Example equation
        } else if (Energy === '') {
            document.getElementById('Energy').value = Powern*Discharge_timen; // Example equation
            autoCalculate2();
            // document.getElementById('input4').readOnly = true; 
        }
    }
    checkResult();
}
function autoCalculate2() {
    const Energy = document.getElementById('Energy').value;
    const Mass_weight = document.getElementById('Mass_weight').value;
    const Mass_height = document.getElementById('Mass_height').value;

    const inputs = [Energy, Mass_weight, Mass_height];
    const filledInputs = inputs.filter(input => input !== '').length;

    if (filledInputs === 2) {
        // Convert to numbers for calculation
        const Energyn = parseFloat(Energy) || 0;
        const Mass_weightn = parseFloat(Mass_weight) || 0;
        const Mass_heightn = parseFloat(Mass_height) || 0;


        if (Energy === '') {
            document.getElementById('Energy').value =Mass_weightn*Mass_heightn*g*e ; // Example equation
            autoCalculate1();
        } else if (Mass_weight === '') {
            document.getElementById('Mass_weight').value = Energyn/(Mass_heightn*g*e); // Example equation
            autoCalculate3();
        } else if (Mass_height === '') {
            document.getElementById('Mass_height').value = Energyn/(Mass_weightn*g*e); // Example equation
            // document.getElementById('input4').readOnly = true; 
        }
    }
    checkResult();
}
function autoCalculate3() {
    const Mass_weight = document.getElementById('Mass_weight').value;
    const Torque = document.getElementById('Torque').value;
    const car_w = document.getElementById('car_w').value;
    const Main_pulley = document.getElementById('Main_pulley').value;
    


    const inputs = [Mass_weight, Torque, car_w, Main_pulley];
    const filledInputs = inputs.filter(input => input !== '').length;

    if (filledInputs === 3) {
        // Convert to numbers for calculation
        const Mass_weightn = parseFloat(Mass_weight) || 0;
        const Torquen = parseFloat(Torque) || 0;
        const car_wn = parseFloat(car_w) || 0;
        const Main_pulleyn = parseFloat(Main_pulley) || 0;
        if (document.getElementById('bumps_radius').value=='')
        {
            r_b = 20;
            document.getElementById('bumps_radius').value=20;
        }
        if (Mass_weight === '') {
            const car_wn1 = car_wn*(40/100);
            document.getElementById('Mass_weight').value = car_wn1*Torquen*r_b/Main_pulleyn; // Example equation
            autoCalculate2();
        } else if (Torque === '') {
            const car_wn1 = car_wn*(40/100);
            document.getElementById('Torque').value = (Mass_weightn*Main_pulleyn)/(r_b*car_wn1); // Example equation
            autoCalculate4();
        } else if (car_w === '') {
            document.getElementById('car_w').value = (Mass_weightn*Main_pulleyn)/(r_b*Torquen); // Example equation
            // document.getElementById('input4').readOnly = true; 
        }
        else if(Main_pulley === ''){
            const car_wn1 = car_wn*(40/100);
            document.getElementById('Main_pulley').value = (Torquen*car_wn1*r_b)/Mass_weightn; // Example equation
            autoCalculate4();
        }

    }
    checkResult();
}
function autoCalculate4() {
    const Torque = document.getElementById('Torque').value;
    const Main_pulley = document.getElementById('Main_pulley').value;
    const Press_distance = document.getElementById('Press_distance').value;

    const inputs = [Torque, Main_pulley, Press_distance];
    const filledInputs = inputs.filter(input => input !== '').length;

    if (filledInputs === 2) {
        // Convert to numbers for calculation
        const Torquen = parseFloat(Torque) || 0;
        const Main_pulleyn = parseFloat(Main_pulley) || 0;
        const Press_distancen = parseFloat(Press_distance) || 0;

        if (document.getElementById('bumps_angle').value=='')
        {
            t_b = 25;
            document.getElementById('bumps_angle').value=25;
        }

        if (Torque === '') {
            document.getElementById('Torque').value = (2*pi*Main_pulleyn*t_b)/(360*Press_distancen); // Example equation
            console.log(Torquen);
            autoCalculate3();
        } else if (Main_pulley === '') {
            document.getElementById('Main_pulley').value = (Torquen*366*Press_distancen)/(2*pi*t_b); // Example equation
            console.log(Main_pulleyn);
            autoCalculate3();
        } else if (Press_distance === '') {
            document.getElementById('Press_distance').value = (2*pi*Main_pulleyn*t_b)/(360*Torquen); // Example equation
            console.log(Press_distancen);
            // document.getElementById('input4').readOnly = true; 
        }
    }
    checkResult();
}

function checkResult()
{
    const Press_distance = document.getElementById('Press_distance').value;
    const Mass_height = document.getElementById('Mass_height').value;

    const inputs = [Mass_height, Press_distance];
    const filledInputs = inputs.filter(input => input !== '').length;
    if (filledInputs === 2) {
        // Convert to numbers for calculation
        const Mass_heightn = parseFloat(Mass_height) || 0;
        const Press_distancen = parseFloat(Press_distance) || 0;
        x = (Mass_heightn)/(Press_distancen);
        console.log(Press_distancen);
        console.log(Mass_heightn);
        if(document.getElementById('bumps_number').value=='')
        {
            bn=1;
            document.getElementById('bumps_number').value=1;
        }
        x/=(2*bn);
        console.log(x);
        document.getElementById('cars_number').value=Math.ceil(x);
    }

}

function clearFields() {
    document.getElementById('calcForm').reset();
}
function resetValues(){
    document.getElementById('bumps_number').value=1.0;
    bn=1.0;
    document.getElementById('bumps_radius').value=20.0;
    r_b=20.0;
    document.getElementById('bumps_angle').value=25.0;
    t_b=25.0;
}
