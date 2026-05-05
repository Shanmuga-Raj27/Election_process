import os
import redis
from dotenv import load_dotenv

load_dotenv()

def check_redis():
    print("🔍 --- NEA Redis Diagnostic --- 🔍\n")
    
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    print(f"STEP 1: Connecting to {redis_url}...")
    
    try:
        r = redis.from_url(redis_url, decode_responses=True)
        # Test 1: Ping
        r.ping()
        print("✅ PING: Success!")
        
        # Test 2: Write
        print("STEP 2: Testing Write...")
        r.set("nea_test_key", "redis_is_working")
        print("✅ WRITE: Success!")
        
        # Test 3: Read
        print("STEP 3: Testing Read...")
        val = r.get("nea_test_key")
        if val == "redis_is_working":
            print("✅ READ: Success!")
        else:
            print(f"❌ READ FAILED: Got {val}")
            
        # Cleanup
        r.delete("nea_test_key")
        
        print("\n🏆 RESULT: Redis is FULLY OPERATIONAL!")
        
    except Exception as e:
        print(f"\n❌ REDIS ERROR: {e}")
        print("\n💡 ADVICE:")
        if "localhost" in redis_url:
            print("   - Are you running Redis locally? (Run 'docker run -d -p 6379:6379 redis')")
        else:
            print("   - Check your Cloud VPC or Firewall settings.")

if __name__ == "__main__":
    check_redis()
