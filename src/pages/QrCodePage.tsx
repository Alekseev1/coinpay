import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrCodePage = () => {
    const navigate = useNavigate();
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [generatedData, setGeneratedData] = useState('https://example.com');
    const qrRef = useRef<SVGSVGElement>(null);

    // Обработка успешного сканирования
    const handleScanSuccess = (result: string) => {
        toast.info(`QR код сканирован: ${result}`);
        setScannedData(result);
        setIsScannerActive(false);
    };

    // Обработка ошибки сканирования
    const handleScanError = (error: Error) => {
        console.error('Ошибка сканирования:', error);
        toast.error('Не удалось считать QR код');
    };

    // Генерация QR-кода и скачивание как изображения
    const handleDownloadQRCode = () => {
        if (!qrRef.current) return;

        const svgElement = qrRef.current;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Размер канваса = размеру SVG (берем из viewBox или атрибутов)
        const svgSize = svgElement.viewBox.baseVal.width || 200;
        canvas.width = svgSize;
        canvas.height = svgSize;

        img.onload = () => {
            if (ctx) {
                ctx.drawImage(img, 0, 0, svgSize, svgSize);
                const pngFile = canvas.toDataURL('image/png');

                // Создаем ссылку для скачивания
                const downloadLink = document.createElement('a');
                downloadLink.download = 'qrcode.png';
                downloadLink.href = pngFile;
                downloadLink.click();

                toast.success('QR код скачан!');
            }
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    return (
        <div>
            <Header title="QR Code" onBackClick={() => navigate(-1)} />
            <div className="p-4 space-y-6">
                {/* Секция генерации */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Генерация QR-кода</h2>
                    <input
                        type="text"
                        value={generatedData}
                        onChange={(e) => setGeneratedData(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Введите данные для QR-кода"
                    />
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-lg inline-block">
                            <QRCode
                                ref={qrRef as any}
                                value={generatedData}
                                size={200}
                                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                            />
                        </div>
                        <button
                            onClick={handleDownloadQRCode}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Скачать QR-код
                        </button>
                    </div>
                </div>

                {/* Секция сканирования */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Сканирование QR-кода</h2>
                    {!isScannerActive ? (
                        <button
                            onClick={() => setIsScannerActive(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Запустить сканер
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="max-w-xs mx-auto">
                                <Scanner
                                    onScan={(result) => {
                                        if (result?.[0]?.rawValue) {
                                            handleScanSuccess(result[0].rawValue);
                                        }
                                    }}
                                    onError={handleScanError}
                                />
                            </div>
                            <button
                                onClick={() => setIsScannerActive(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Остановить сканер
                            </button>
                        </div>
                    )}
                    {scannedData && (
                        <div className="mt-4 p-3 bg-gray-100 rounded">
                            <p className="font-medium">Результат:</p>
                            <p className="break-all">{scannedData}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default QrCodePage;