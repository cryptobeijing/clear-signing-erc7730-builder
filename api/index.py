from fastapi import FastAPI
from subprocess import Popen, PIPE
from dotenv import load_dotenv
import os
from erc7730.generate.generate import generate_descriptor
import os
import traceback

etherscan_api_key = os.getenv("ETHERSCAN_API_KEY")
env = os.environ.copy()
env["ETHERSCAN_API_KEY"] = etherscan_api_key
env["XDG_CACHE_HOME"] = '/tmp'

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/generate")
def run_erc7730(address: str, chain_id: int):
    """generate the  'erc7730' based on the contract address"""
    try:
        load_dotenv()

        result = generate_descriptor(
            chain_id=chain_id,
            contract_address=address,
        )
        return {
            "erc7730_path": result,
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/py/debug")
def debug_env():
    try:
        load_dotenv()
        address = "0x0bb4d3e88243f4a057db77341e6916b0e449b158"

        result = generate_descriptor(
            chain_id=1,
            contract_address=address,
        )
        return {
            "erc7730_path": result,
        }
    except Exception as e:
        tb = traceback.format_exc()
        return {"error": f"{e}: {tb}"}