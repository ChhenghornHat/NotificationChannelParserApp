using Microsoft.AspNetCore.Mvc;
using NotificationChannelParserApp.Models;
using NotificationChannelParserApp.Repo;

namespace NotificationChannelParserApp.Controllers;

public class UsersController : Controller
{
    private readonly UserRepo userRepo;
    private readonly ReturnMessage returnMessage = new();

    public UsersController(UserRepo userRepo)
    {
        this.userRepo = userRepo;
    }
    
    [Route("users")]
    public IActionResult Users()
    {
        return View();
    }
    
    // GET: Get All Users
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userList = await userRepo.GetAll();
        
        return Ok(userList);
    }
    
    // GET: Get Single Users
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var userList = await userRepo.GetById(id);
        
        return Ok(userList);
    }
    
    // POST: Post To Create User
    [HttpPost]
    public async Task<IActionResult> Create(User user)
    {
        try
        {
            await userRepo.Create(user);
            
            returnMessage.StatusCode = 200;
            returnMessage.StatusMessage = "Data saved successfully.";
        }
        catch (Exception e)
        {
            returnMessage.StatusCode = 500;
            returnMessage.StatusMessage = "Data save failed.";
            returnMessage.MessageDetail = e.Message;
        }

        return Ok(returnMessage);
    }
    
    // POST: Post To Create User
    [HttpPost]
    public async Task<IActionResult> Update(User user)
    {
        try
        {
            await userRepo.Update(user);
            
            returnMessage.StatusCode = 200;
            returnMessage.StatusMessage = "Data updated successfully.";
        }
        catch (Exception e)
        {
            returnMessage.StatusCode = 500;
            returnMessage.StatusMessage = "Data update failed.";
            returnMessage.MessageDetail = e.Message;
        }

        return Ok(returnMessage);
    }
}