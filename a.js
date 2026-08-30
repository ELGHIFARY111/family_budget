let transaksi = [];
function saveTransaksi() {
    const data = JSON.stringify(transaksi);
    localStorage.setItem("transaksi", data);
}
function loadTransaksi() {
    const localData = localStorage.getItem("transaksi");
    if (localData) {
        transaksi = JSON.parse(localData);
    }
}
function getID() {
    let lastId = transaksi.findLast((item) => item.id);
    return lastId ? lastId.id + 1 : 1;
}
function tambahTransaksi(tanggal, deskripsi, tipe, jumlah) {
    lastId = getID();
    transaksi.push({
        id: lastId,
        tanggal: tanggal,
        deskripsi: deskripsi,
        tipe: tipe,
        jumlah: jumlah,
    });
    saveTransaksi();
    showTransaksi();
    showSaldo();
}
const tombolFilter = document.getElementById("filterTipe");
tombolFilter.addEventListener("change", showTransaksi);

const searchField = document.getElementById("search");
searchField.addEventListener("input", showTransaksi);

function showTransaksi() {
    const daftarTransaksi = document.getElementById("daftarTransaksi");
    daftarTransaksi.innerHTML = "";

    const kataKunci = searchField.value.toLowerCase();

    const filteredTransaksi = transaksi.filter(function (item) {
        const cocokTipe =
            tombolFilter.value == "semua" || item.tipe == tombolFilter.value;

        const cocokSearch = item.deskripsi.toLowerCase().includes(kataKunci);

        return cocokTipe && cocokSearch;
    });

    for (let id = 0; id < filteredTransaksi.length; id++) {
        const baris = document.createElement("tr");
        const kolom1 = document.createElement("td");
        const kolom2 = document.createElement("td");
        const kolom3 = document.createElement("td");
        const kolom4 = document.createElement("td");
        const kolom5 = document.createElement("td");
        const kolom6 = document.createElement("td");
        kolom1.textContent = id + 1;
        kolom2.textContent = filteredTransaksi[id].id;
        kolom3.textContent = filteredTransaksi[id].tanggal;
        kolom4.textContent = filteredTransaksi[id].deskripsi;
        kolom5.textContent = filteredTransaksi[id].tipe;
        kolom6.textContent = filteredTransaksi[id].jumlah;
        baris.appendChild(kolom1);
        baris.appendChild(kolom2);
        baris.appendChild(kolom3);
        baris.appendChild(kolom4);
        baris.appendChild(kolom5);
        baris.appendChild(kolom6);
        const buttonHapus = document.createElement("button");
        buttonHapus.id = filteredTransaksi[id].id;
        buttonHapus.textContent = "Hapus";
        buttonHapus.addEventListener("click", hapusTransaksi);
        const kolomAksi = document.createElement("td");
        kolomAksi.appendChild(buttonHapus);
        baris.appendChild(kolomAksi);
        daftarTransaksi.appendChild(baris);
    }
}
function hapusTransaksi(event) {
    const index = transaksi.findIndex(function (item) {
        return item.id == event.target.id;
    });
    if (index !== -1) {
        transaksi.splice(index, 1);
        saveTransaksi();
        showTransaksi();
        showSaldo();
    }
}
const formTransaksi = document.getElementById("tambahTransaksi");
formTransaksi.addEventListener("submit", function (event) {
    event.preventDefault();
    let tanggal = document.getElementById("tanggal").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let tipe = document.getElementById("tipe").value;
    let jumlah = Number(document.getElementById("jumlah").value);
    if (validasiInput(tanggal, deskripsi, tipe, jumlah)) {
        tambahTransaksi(tanggal, deskripsi, tipe, jumlah);
    }
});
function showSaldo() {
    const total = transaksi.reduce((total, item) => total + item.jumlah, 0);
    const saldoPlace = document.getElementById("saldo");

    saldoPlace.innerHTML = `Rp. ${total}`;
}
function validasiInput(tanggal, deskripsi, tipe, jumlah) {
    let teks = "";
    if (!tanggal) {
        teks += "Tanggal harus diisi\n";
    }
    if (!deskripsi) {
        teks += "Deskripsi harus diisi\n";
    }
    if (!tipe) {
        teks += "Tipe harus diisi\n";
    }
    if (jumlah <= 0) {
        teks += "jumlah harus diisi\n";
    }
    if (teks) {
        alert(teks);
        return false;
    }
    return true;
}
document.addEventListener("DOMContentLoaded", function () {
    loadTransaksi();
    showTransaksi();
    showSaldo();
});
