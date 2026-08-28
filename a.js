const trannsaksi = [
    {
        "id":1,
        "tanggal":"22-04-2006",
        "deskripsi":"nabung",
        "jumlah":200000
    }
]
function getID(){

};
function tambahTransaksi(tanggal, deskripsi, jumlah){
    let lastId = trannsaksi.length;
    trannsaksi.push(
        {
            "id":lastId++,
            "tanggal": tanggal,
            "deskripsi":deskripsi,
            "jumlah": jumlah
        }
    )
};

function showTransaksi(){
    let id = 1;
    const buttonHapus = document.createElement("button");
    buttonHapus.addEventListener("click", hapusTransaksi())
    while (trannsaksi.length <= id){
        const baris = document.createElement("tr");
        baris.innerHTML=`
            <td>${trannsaksi.id}</td>
            <td>${trannsaksi.tanggal}</td>
            <td>${trannsaksi.deskripsi}</td>
            <td>${trannsaksi.jumlah}</td>
            <td>${buttonHapus}</td>
        `
    };
};
function hapusTransaksi(){
    const id 
}
const formTransaksi = document.getElementById("tambahTransaksi");
formTransaksi.addEventListener("click", function(){
    let tanggal = document.getElementById("tanggal").value();
    let deskripsi = document.getElementById("deskripsi").value();
    let jumlah = document.getElementById("jumlah").value();
    tambahTransaksi(tanggal,deskripsi,jumlah)

})