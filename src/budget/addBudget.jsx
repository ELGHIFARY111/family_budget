import { useState } from "react";
import { API_URL } from "../api";

export default function AddBudget({ getTransaksi }) {
    const [dataTransaksi, setDataTransaksi] = useState({
        user_id: 1,
        description: "",
        amount: null,
        category_id: null,
        transaction_date: "",
    });
    const handleChange = (e) => {
        setDataTransaksi({
            ...dataTransaksi,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/api/transactions/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataTransaksi),
        })
            .then((response) => response.json())
            .then(() => {
                getTransaksi();
            });
    };
    return (
        <>
            <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-5 text-xl font-bold text-gray-800">
                    Tambahkan Transaksi
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="keterangan"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Keterangan
                        </label>

                        <input
                            type="text"
                            id="keterangan"
                            name="description"
                            onChange={handleChange}
                            placeholder="Contoh: Belanja kebutuhan dapur"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="jumlah"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Jumlah
                        </label>

                        <input
                            type="number"
                            id="jumlah"
                            name="amount"
                            onChange={handleChange}
                            placeholder="Contoh: 50000"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="kategori"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Kategori
                        </label>

                        <select
                            id="kategori"
                            name="category_id"
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Pilih kategori</option>
                            <option value="3">Makanan</option>
                            <option value="4">Transportasi</option>
                            <option value="5">Belanja</option>
                            <option value="6">Tagihan</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="tanggal"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Tanggal
                        </label>

                        <input
                            type="date"
                            id="tanggal"
                            name="transaction_date"
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Simpan Transaksi
                    </button>
                </form>
            </div>
        </>
    );
}
