const poll = new Map(); // To create a new map
poll.set('React', 0); // To add data (key = 'React', value = 0) to the map (poll)
poll.set('Vue', 0);
poll.set('Angular', 0);
poll.set('Svelte', 0);
poll.set('Other', 0);

function submitForm(e) {
  e.preventDefault();

  const selectedOption = document.querySelector(
    "input[name='poll-option']:checked"   // To get the checked input tag
  );
  // console.log(selectedOption);  // To test it (for Vue): <input id="poll-option" class="form-check-input" type="radio" name="poll-option" value="Vue">

  if (!selectedOption) {  // To have an alert in case nothing was checked
    alert('Please select an option');
    return;
  }

  let voteCount = poll.get(selectedOption.value); // To get the value of the checked one from the map (poll)
  poll.set(selectedOption.value, ++voteCount);  // To add one vote to the checked option
  // console.log(poll);  // To test it

  displayResults();

  // Disable form fields after submit
  document
    .getElementById('poll-form')
    .querySelectorAll('input, button')
    .forEach((el) => el.setAttribute('disabled', true));
}

function displayResults() {
  const results = document.getElementById('results');
  results.innerHTML = ''; // To initially have it empty
  for (let [option, votes] of poll) { // option = key, votes = value
    const optionElement = document.createElement('div');  // To create a new div
    optionElement.classList.add(  // To add some bootstrap classes
      'border-bottom',
      'p-2',
      'd-flex',
      'justify-content-between'
    );
    optionElement.innerHTML = `<strong>${option}: </strong> ${votes} votes`;
    results.appendChild(optionElement);
  }
}

document.getElementById('poll-form').addEventListener('submit', submitForm);
