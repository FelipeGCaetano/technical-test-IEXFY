'use client'

import { useState, useEffect } from 'react'
import { Client } from '@/lib/types/client'
import { X, Loader2 } from 'lucide-react'

interface ClientModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    client?: Client | null
}

const formatCpfCnpj = (value: string) => {
    const digits = value.replace(/\D/g, ""); // Remove tudo que não é número

    if (digits.length <= 11) {
        // Máscara CPF: 000.000.000-00
        return digits
            .replace(/(\={11}).*/, "$1") // Limita a 11 dígitos
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        // Máscara CNPJ: 00.000.000/0000-00
        return digits
            .slice(0, 14) // Limita a 14 dígitos
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }
};

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits
        .slice(0, 11) // Limita a 11 dígitos (DDD + 9 números)
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
};

export const ClientModal = ({ isOpen, onClose, onSuccess, client }: ClientModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        cpfCnpj: '',
        phone: '',
        address: ''
    })

    useEffect(() => {
        if (isOpen) {
            if (client) {
                setFormData({
                    name: client.name,
                    cpfCnpj: client.cpfCnpj,
                    phone: client.phone,
                    address: client.address
                })
            } else {
                setFormData({ name: '', cpfCnpj: '', phone: '', address: '' })
            }
        }
    }, [client, isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const isEditing = !!client
        const url = isEditing ? `/api/clients/${client.id}` : '/api/clients'
        const method = isEditing ? 'PATCH' : 'POST'

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                onSuccess()
                onClose()
            } else {
                const error = await response.json()
                alert(`Erro: ${error.message || 'Falha na operação'}`)
            }
        } catch (error) {
            console.error("Erro ao processar cliente:", error)
            alert("Erro de conexão com o servidor.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-900">
                        {client ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo / Razão Social</label>
                            <input
                                className="w-full border border-slate-200 p-2.5 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Ex: Felipe Gabriel"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">CPF ou CNPJ</label>
                            <input
                                className="w-full border border-slate-200 p-2.5 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                value={formData.cpfCnpj}
                                onChange={e => setFormData({ ...formData, cpfCnpj: formatCpfCnpj(e.target.value) })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Telefone</label>
                                <input
                                    className="w-full border border-slate-200 p-2.5 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="(11) 99999-9999"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Endereço Completo</label>
                            <textarea
                                className="w-full border border-slate-200 p-2.5 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                rows={2}
                                placeholder="Rua, número, bairro, cidade - UF, CEP"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                            {client ? 'Salvar Alterações' : 'Confirmar Cadastro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}