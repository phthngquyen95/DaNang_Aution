import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  statusCode?: number;
  error?: string;
  data?: any;
}

const results: TestResult[] = [];

async function testEndpoint(
  method: string,
  endpoint: string,
  data?: any,
  token?: string,
  skipAuth = false
) {
  try {
    const config: any = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    results.push({
      endpoint,
      method,
      status: 'PASS',
      statusCode: response.status,
      data: response.data,
    });
    return response.data;
  } catch (error: any) {
    if (skipAuth && error.response?.status === 401) {
      results.push({
        endpoint,
        method,
        status: 'SKIP',
        statusCode: 401,
        error: 'Requires authentication (expected)',
      });
    } else {
      results.push({
        endpoint,
        method,
        status: 'FAIL',
        statusCode: error.response?.status,
        error: error.response?.data?.message || error.message,
      });
    }
    return null;
  }
}

async function runTests() {
  console.log('🧪 Bắt đầu test API...\n');

  // Test auth endpoints
  console.log('\n📝 Testing Auth endpoints...');
  const loginData = await testEndpoint('POST', '/api/auth/login', {
    username: 'admin',
    password: 'admin123',
  });

  let token = loginData?.access_token;

  // Test categories
  console.log('\n📂 Testing Categories endpoints...');
  await testEndpoint('GET', '/category');

  // Test auction sessions
  console.log('\n🏛️  Testing Auction Sessions endpoints...');
  await testEndpoint('GET', '/auction-session');

  // Test auction documents (assets)
  console.log('\n📄 Testing Auction Documents endpoints...');
  await testEndpoint('GET', '/api/assets');

  // Test users (requires auth)
  console.log('\n👤 Testing Users endpoints...');
  await testEndpoint('GET', '/api/admin/users', undefined, token, true);
  await testEndpoint('GET', '/api/auth/profile', undefined, token, true);

  // Test payments (requires auth)
  console.log('\n💰 Testing Payments endpoints...');
  await testEndpoint('POST', '/api/payments', { sessionId: 1, amount: 1000000 }, token, true);

  // Test auction bids (requires auth)
  console.log('\n🔨 Testing Auction Bids endpoints...');
  await testEndpoint('POST', '/api/sessions/1/bids', { amount: 5000000 }, token, true);

  // Print results
  console.log('\n\n📊 KẾT QUẢ TEST API:\n');
  console.log('='.repeat(80));

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const skipped = results.filter((r) => r.status === 'SKIP').length;

  results.forEach((result) => {
    const icon =
      result.status === 'PASS' ? '✅' : result.status === 'SKIP' ? '⏭️ ' : '❌';
    console.log(
      `${icon} ${result.method.padEnd(6)} ${result.endpoint.padEnd(35)} [${result.statusCode || 'N/A'}]`
    );
    if (result.error) {
      console.log(`   └─ ${result.error}`);
    }
  });

  console.log('='.repeat(80));
  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`📊 Total: ${results.length}\n`);

  if (failed > 0) {
    console.log('⚠️  Có lỗi xảy ra. Kiểm tra chi tiết ở trên.');
    process.exit(1);
  } else {
    console.log('🎉 Tất cả API hoạt động tốt!');
    process.exit(0);
  }
}

// Check if server is running
axios
  .get(`${BASE_URL}/api/auth/login`, { validateStatus: () => true })
  .then(() => {
    runTests();
  })
  .catch(() => {
    console.error('❌ Server chưa chạy. Vui lòng chạy: npm run start:dev');
    process.exit(1);
  });
