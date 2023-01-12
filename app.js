const film1 = {
   odgledan : false,
   naziv : "Enter the Void",
   godina : 2009,
   drzava : "France",
   napomena : "Sex. Money. Power.",
   glumci : ["Paz de la Huerta","Nathaniel Brown","Cyril Roy"],
};

const film2 = {
   odgledan : false,
   naziv : "Blade Runner 2049",
   godina : 2017,
   drzava : "USA",
   napomena : "The key to the future is finally unearthed.",
   glumci : ["Ryan Gosling","Harrison Ford","Ana de Armas"],
};

const film3 = {
   odgledan : false,
   naziv : "The Lighthouse",
   godina : 2019,
   drzava : "USA",
   napomena : "There is enchantment in the light.",
   glumci : ["Willem Dafoe","Robert Pattison","Valeriia Karman"],
};

const filmovi = [film1,film2,film3];

const table_body = document.getElementById('tbody');

function checkbox(table_row,film){
   const table_data = document.createElement('td');

   function colorChange(checked){
      film.odgledan = checked;
      table_row.style.backgroundColor = checked ? '#D1E7DD' : '#F8D7DA';
   }

   const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = '';
  checkbox.classList.add('form-check-input');
  checkbox.onchange = event => colorChange(event.target.checked);
  colorChange(checkbox.checked = film.odgledan);

  table_data.append(checkbox);

  table_row.append(table_data);
}

function tableData(table_row,value){
   const table_data = document.createElement('td');
   table_data.innerText = value;
   table_row.append(table_data);
}

const film_form = document.getElementById('dodaj_film');


function dodajFilm(film){
      const table_row = document.createElement('tr');
      checkbox(table_row,film);
      tableData(table_row,film.naziv);
      tableData(table_row,film.godina);
      tableData(table_row,film.drzava);
      tableData(table_row,film.napomena);
      tableData(table_row,film.glumci.join(', '));
      table_body.append(table_row);
   
}

filmovi.forEach(film => {
   dodajFilm(film)
});   

function noviFilm(){
   const getValue = (id) => document.getElementById(id).value;
   const getRadioValue = (name) => document.querySelector(`input[name="${name}"]:checked`).value;

   const naziv = getValue('naziv');
   const godina = getValue('godina');
   const drzava = getValue('drzava');
   const glumci = getValue('glumci');
   const odgledan = getRadioValue('odgledan');
   const napomena = getValue('napomena');


   const dodan_film = {
      naziv,
      godina,
      drzava,
      glumci: glumci.split(',').map(glumac => glumac.trim()),
      odgledan: odgledan === 'Da' ? true : false,
      napomena,
    };

   filmovi.push(dodan_film);
   dodajFilm(dodan_film);
   bootstrap.Modal.getInstance(document.getElementById('staticBackdrop')).hide();
   film_form.classList.remove('was-validated')
   film_form.reset();
}

film_form.addEventListener('submit', e => {
   e.preventDefault()
   e.stopPropagation()
 
   film_form .classList.add('was-validated')
   if (film_form .checkValidity()) {
     noviFilm();
   }
 }, false)