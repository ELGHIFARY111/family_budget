import { useEffect, useRef, useState } from "react";
import AddBudget from "./addBudget";
import { API_URL } from "../api";

export default function Budget() {
    const [transaksi, setTransaksi] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const saldo = useRef(0);
    const getTransaksi = () => {
        fetch(`${API_URL}/api/transactions/`)
            .then((response) => response.json())
            .then((data) => {
                setTransaksi(data);
                saldo.current = data.reduce(
                    (total, transaksi) => total + Number(transaksi.amount),
                    0,
                );
                setLoaded(true);
            });
    };
    useEffect(() => {
        getTransaksi();
    }, []);
    function handleDelete(id) {
        console.log("ID DELETE:", id);

        fetch(`${API_URL}/api/transactions/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
            .then((response) => {
                console.log("Status:", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("Response:", data);
                getTransaksi();
            })
            .catch((error) => console.error(error));
    }
    if (loaded) {
        return (
            <>
                <div className="min-h-screen bg-gray-100 p-8">
                    <div className="mx-auto max-w-7xl">
                        <h1 className="mb-6 text-3xl font-bold text-gray-800">
                            Hitung Budget Keluarga
                            <br />
                            Saldo: Rp.{saldo.current}
                        </h1>

                        <div className="mb-6">
                            <AddBudget getTransaksi={getTransaksi} />
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white shadow-md">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-800 text-xs uppercase text-white">
                                        <tr>
                                            <th className="px-6 py-4">User</th>
                                            <th className="px-6 py-4">
                                                Kategori
                                            </th>
                                            <th className="px-6 py-4">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-4">
                                                Keterangan
                                            </th>
                                            <th className="px-6 py-4">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-4">
                                                Dibuat
                                            </th>
                                            <th className="px-6 py-4">
                                                ACTION
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {transaksi.map((transaksi) => (
                                            <tr
                                                key={transaksi.id}
                                                className="border-b border-gray-200 bg-white hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {transaksi.name}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {transaksi.category}
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-gray-900">
                                                    Rp {transaksi.amount}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {transaksi.description}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {transaksi.transaction_date}
                                                </td>

                                                <td className="px-6 py-4 text-gray-500">
                                                    {transaksi.created_at}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                transaksi.id,
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-red-700 border-b-black text-amber-50 text-center rounded-lg transition ease-in duration-700"
                                                    >
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1>LOADING...............</h1>
            </>
        );
    }
}
