class AdVividApp {
    constructor() {
        this.initUI();
        this.checkBackendStatus();
    }

    initUI() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = `
            <header class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-900">
                        <i class="fas fa-robot text-blue-500 mr-2"></i>
                        AdVivid AvatarX
                    </h1>
                    <nav class="flex space-x-8">
                        <a href="#" class="text-gray-500 hover:text-gray-700">Dashboard</a>
                        <a href="#" class="text-gray-500 hover:text-gray-700">Pricing</a>
                        <a href="#" class="text-gray-500 hover:text-gray-700">Docs</a>
                    </nav>
                </div>
            </header>
            <main class="flex-grow">
                <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div class="bg-white rounded-xl shadow-md overflow-hidden p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
                        <div id="status-indicator" class="flex items-center">
                            <div class="h-4 w-4 rounded-full bg-gray-300 mr-2"></div>
                            <span>Checking backend services...</span>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="bg-white border-t border-gray-200 py-4">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    © 2023 AdVivid Technologies. All rights reserved.
                </div>
            </footer>
        `;
    }

    async checkBackendStatus() {
        try {
            const response = await fetch('/api/status');
            const data = await response.json();
            
            const indicator = document.querySelector('#status-indicator');
            if (data.status === 'operational') {
                indicator.innerHTML = `
                    <div class="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                    <span>All systems operational (v${data.version})</span>
                `;
            } else {
                indicator.innerHTML = `
                    <div class="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                    <span>Service disruption detected</span>
                `;
            }
        } catch (error) {
            console.error('Backend connection failed:', error);
            const indicator = document.querySelector('#status-indicator');
            indicator.innerHTML = `
                <div class="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                <span>Cannot connect to backend services</span>
            `;
        }
    }
}

// Initialize application
new AdVividApp();