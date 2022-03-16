// Listen for submit
    document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results and clear button
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Resouts
function calculateResults(){
    // Show results and clear button
    document.getElementById('results').style.display = 'block';
    document.getElementById('clear').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    // Calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2); 
    } else {
        showError('Please check your numbers')
    }
}

// Show Error
function showError (error) {
    // Hide Results and clear button
    document.getElementById('results').style.display = 'none';
    document.getElementById('clear').style.display = 'none';
    
    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elemnts
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className ='alert alert-danger';

    // Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above heading
    card.insertBefore(errorDiv, heading); 

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000); // call a function , 3000 millisseconds

}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}

// Listen for click
document.getElementById('clear').addEventListener('click', clearPage);

// Clear Results
function clearPage(){
    location.reload();
}