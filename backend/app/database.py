import motor.motor_asyncio

MONGO_DETAILS = "mongodb+srv://prazzwalthapa87:Ohmygod123@cluster0.1fwe1vz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = None
db = None

async def get_client():
    return motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

async def startup_db_client():
    global client, db
    client = await get_client()
    db = client["users"]

async def shutdown_db_client():
    client.close()
