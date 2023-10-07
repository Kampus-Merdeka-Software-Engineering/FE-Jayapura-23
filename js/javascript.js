$(document).ready(function () {
    // Fungsi untuk mengaktifkan dan menonaktifkan menu pada perubahan lebar layar
    function toggleMenu() {
        var width = $(window).width();
        var menu = $("nav .menu ul");

        if (width < 990) {
            menu.css("display", "none");
            $(".tombol-menu").click(function () {
                menu.toggle();
            });
            menu.click(function () {
                menu.toggle();
            });
        } else {
            menu.css("display", "block");
        }
    }

    // Pemanggilan pertama kali
    toggleMenu();

    // Event listener untuk perubahan lebar layar
    $(window).resize(function () {
        toggleMenu();
    });

    // Efek scroll
    var scroll_pos = 0;
    $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        var nav = $("nav");
        var navImages = nav.find("img");

        if (scroll_pos > 0) {
            nav.addClass("putih");
            navImages.filter(".hitam").show();
            navImages.filter(".putih").hide();
        } else {
            nav.removeClass("putih");
            navImages.filter(".hitam").hide();
            navImages.filter(".putih").show();
        }
    });

    // Event listener untuk toggle gambar pada div "our-team"
    document.querySelectorAll('#our-team div img').forEach(img => {
        img.addEventListener('click', () => {
            img.parentElement.classList.toggle('clicked');
        });
    });
});

const BASE_URL = 'http://localhost:3000'

function inputDataBarang(event) {
    const namaPengguna = document.querySelector("#nama-pengguna")
    const nomorHP = document.querySelector("#nomorhp")
    const namaBarang = document.querySelector("#nama-barang")
    const alamatTujuan = document.querySelector("#alamat-tujuan")
    const email = document.querySelector("#email")

    fetch(`${BASE_URL}/input-data-barang`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama: namaPengguna.value,
            nomorHP: nomorHP.value,
            email: email.value,
            alamatTujuan: alamatTujuan.value,
            namaBarang: namaBarang.value,
        }),
    })
        .then(response => response.json())
        .then((response) => {
            alert(`Data berhasil diinputkan, nomor resi anda adalah ${response.nomorResi}`);
            namaPengguna.value = '';
            nomorHP.value = '';
            namaBarang.value = '';
            alamatTujuan.value = '';
            email.value = '';
        })
        .catch(error => {
            console.error(error);
        });
}

function cekResi(event) {
    const nomorResi = document.querySelector("#input-cek-resi")
    fetch(`${BASE_URL}/cek-resi/${nomorResi.value}`)

        .then(response => response.json())
        .then((response) => {
            if (response.data) {
                document.querySelector("#content-cek-resi").innerHTML = `
                <ul>
                     <li style="list-style: none">Nama:${response.data.nama}</li>
                     <li style="list-style: none">Email:${response.data.email}</li>
                     <li style="list-style: none">Nama Barang:${response.data.namaBarang}</li>
                     <li style="list-style: none">Nomor HP:${response.data.nomorHP}</li>
                </ul>
                `;
            } else {
                alert("Nomor resi tidak ditemukan")
            }

        })
        .catch(error => {
            console.error(error);
        });
}